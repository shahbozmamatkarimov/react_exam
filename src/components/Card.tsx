import styles from "@/styles/card.module.scss";
import deleteSVG from "../assets/svg/delete.svg";
import editSVG from "../assets/svg/edit.svg";
import Link from "next/link";
// MUI
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import ProductServices from "../services/products";
import axios from "axios";

import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import Typography from "@mui/joy/Typography";
import Textarea from "@mui/joy/Textarea";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface ProductData {
  category?: string;
  price?: number;
  id?: number;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Cards() {
  const [products, setProducts] = React.useState<ProductData[]>([]);
  const [editId, setEditId] = React.useState<number>();
  const [category, setCategory] = React.useState<string>("");
  const [price, setPrice] = React.useState<any>("");
  const [delModal, setDelModal] = React.useState<boolean>(false);
  const [deleteId, setDeleteId] = React.useState<number>(0);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    getProducts();
  }, []);

  function getProducts(): void {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        console.log(res.data.products);
        setProducts(res?.data?.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // edit
  const editProduct = (e: any) => {
    const productData: ProductData = { price, category };

    axios
      .put(`https://dummyjson.com/products/${editId}`, productData)
      .then((res: any) => {
        if (typeof editId === "number") {
          for (let i in products) {
            if (products[i].id == editId) {
              products[i].price = res.data.price;
              products[i].category = res.data.category;
            }
          }
        }
        setCategory("");
        setPrice("");
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
    e.preventDefault();
  };

  const deleteProduct = () => {
    axios
      .delete(`https://dummyjson.com/products/${deleteId}`)
      .then((res: any) => {
        for (let i in products) {
          if (products[i].id == deleteId) {
            products.splice(Number(i), 1);
          }
        }
        setDelModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={[styles.grid, styles.px1, styles.gap40].join(" ")}>
        {products?.map((card: any) => (
          <Card
            key={card.id}
            sx={{
              maxWidth: 344,
              minWidth: 344,
              borderRadius: "15px",
              boxShadow: "0px 8px 16px #eaeff0",
              pb: "16px",
            }}
          >
            <Link href={`/${card.id}`}>
              <CardMedia
                component="img"
                height="344"
                width="344"
                sx={{ cursor: "pointer", objectFit: "cover" }}
                image={card.thumbnail}
                alt="Paella dish"
              />
            </Link>
            <CardContent>
              <Typography
                className={[styles.fontweight, styles.fs14].join(" ")}
              >
                {card.category}
              </Typography>
            </CardContent>
            <div className={[styles.flex].join(" ")}>
              <CardContent>
                <Typography
                  className={[styles.fontweight, styles.fs16].join(" ")}
                >
                  ${card.price}
                </Typography>
              </CardContent>
              <div className={styles.actions}>
                <div className={styles.edit}>
                  <Image
                    onClick={() => {
                      setOpen(true);
                      setEditId(card.id);
                    }}
                    src={editSVG}
                    alt="delete"
                    width={30}
                    height={30}
                  />
                </div>
                <div className={styles.delete}>
                  <Image
                    onClick={() => {
                      setDelModal(true);
                      setDeleteId(card.id);
                    }}
                    src={deleteSVG}
                    alt="delete"
                    width={30}
                    height={30}
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* edit modal */}
      <React.Fragment>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{ maxWidth: 500 }}
          >
            <Typography id="basic-modal-dialog-title" level="h2">
              Edit the product
            </Typography>
            <Typography id="basic-modal-dialog-description">
              Fill in the information of the product.
            </Typography>
            <form onSubmit={(e) => editProduct(e)}>
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <Input
                    onInput={(e: any): void => setCategory(e.target.value)}
                    value={category}
                    autoFocus
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Price</FormLabel>
                  <Input
                    onInput={(e: any): void => setPrice(e.target.value)}
                    value={price}
                    type="number"
                    required
                  />
                </FormControl>
                <Button type="submit">Submit</Button>
              </Stack>
            </form>
          </ModalDialog>
        </Modal>
      </React.Fragment>

      {/* delete modal */}
      <React.Fragment>
        <Modal open={delModal} onClose={() => setDelModal(false)}>
          <ModalDialog
            variant="outlined"
            role="alertdialog"
            aria-labelledby="alert-dialog-modal-title"
            aria-describedby="alert-dialog-modal-description"
          >
            <Typography
              id="alert-dialog-modal-title"
              level="h2"
              startDecorator={<WarningRoundedIcon />}
            >
              Confirmation
            </Typography>
            <Divider />
            <Typography
              id="alert-dialog-modal-description"
              textColor="text.tertiary"
            >
              Are you sure you want to discard all of your notes?
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "flex-end",
                pt: 2,
              }}
            >
              <Button
                variant="plain"
                color="neutral"
                onClick={() => setDelModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="solid"
                color="danger"
                onClick={() => deleteProduct()}
              >
                Discard notes
              </Button>
            </Box>
          </ModalDialog>
        </Modal>
      </React.Fragment>
    </>
  );
}
