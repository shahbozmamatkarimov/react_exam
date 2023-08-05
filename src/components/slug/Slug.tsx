import styles from "@/styles/slug.module.scss";
import star from "@/assets/svg/star.svg";
import starWhite from "@/assets/svg/starWhite.svg";
import deleteSVG from "@/assets/svg/delete2.svg";
import editSVG from "@/assets/svg/edit.svg";
import img from "@/assets/IMG.png";
import { useRouter } from "next/router";
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
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";

import { useParams } from "react-router-dom";
import axios from "axios";
import ProductServices from "../../services/products";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import Textarea from "@mui/joy/Textarea";

import Divider from "@mui/joy/Divider";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
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

interface ProductData {
  description?: string;
  brand?: string;
}

export default function Slug() {
  const [open, setOpen] = React.useState(false);
  const [delModal, setDelModal] = React.useState<boolean>(false);
  const [description, setDescription] = React.useState<string>("");
  const [brand, setBrand] = React.useState<string>("");
  const [step, setStep] = React.useState<number>(0);

  const [products, setProducts] = React.useState<ProductData[]>([]);
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const router = useRouter();

  const id = router.asPath;

  const images = [1, 2, 3, 4, 5];
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  React.useEffect(() => {
    if (id == "/[slug]") return;
    console.log(id);
    axios.get(`https://dummyjson.com/products${id}`).then((res) => {
      console.log(res.data);
      setProducts([res?.data]);
    });
  }, [id]);

  const deleteProduct = () => {
    axios
      .delete(`https://dummyjson.com/products/${id}`)
      .then((res: any) => {
        console.log(res);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editProduct = (e: any) => {
    axios
      .put(`https://dummyjson.com/products/${id}`, { description, brand })
      .then((res: any) => {
        products[0].description = description;
        products[0].brand = brand;
        setDescription("");
        setBrand("");
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
    e.preventDefault();
  };

  return (
    <>
      <button
        type="button"
        className={[styles.edit, styles.margin].join(" ")}
        onClick={() => router.back()}
      >
        Back to home page
      </button>
      {products?.map((product: any) => (
        <div key={product.id}>
          <div className={[styles.flex, styles.px1, styles.gap40].join(" ")}>
            <div>
              <Card
                sx={{
                  maxWidth: 500,
                  height: { default: 300, sm: 500 },
                  borderRadius: "10px",
                  boxShadow: "0px 8px 16px #eaeff0",
                }}
              >
                <CardMedia
                  component="img"
                  height="500"
                  image={product.images[step]}
                  alt="Paella dish"
                />
              </Card>
              <div className={styles.imageGroup}>
                {product.images.map((image:string, index:number) => (
                  <Image
                    onClick={() => setStep(index)}
                    key={image}
                    src={image}
                    className={step == index ? styles.select : styles.selected}
                    alt=""
                    objectFit="cover"
                    width={64}
                    height={64}
                  />
                ))}
              </div>
            </div>
            <div>
              <button className={styles.brand}>{product.brand}</button>
              <h2>{product.description}</h2>
              <div>
                {["0", "2", "3", "4", "5"]
                  .slice(0, Math.floor(product.rating))
                  .map((img) => (
                    <Image key={img} src={star} alt="" width={14} height={14} />
                  ))}
                {["0", "2", "3", "4", "5"]
                  .splice(0, 5 - Math.floor(product.rating))
                  .map((img) => (
                    <Image
                      key={img}
                      src={starWhite}
                      alt=""
                      width={14}
                      height={14}
                    />
                  ))}
                <span className={styles.stars}>{product.rating}</span>
              </div>
              <p className={styles.flex}>
                <span className={styles.discount}>${product.price - 21}</span>
                <span className={styles.price}>${product.price}</span>
              </p>
              <div className={styles.btnGroup}>
                <button onClick={() => setOpen(true)} className={styles.edit}>
                  <Image src={editSVG} alt="edit" width={20} height={20} />
                  Изменить
                </button>
                <button
                  onClick={() => setDelModal(true)}
                  className={styles.delete}
                >
                  <Image src={deleteSVG} alt="delete" width={16} height={16} />
                  Удалить
                </button>
              </div>
            </div>
          </div>

          <Box
            sx={{
              maxWidth: "100%",
              margin: "1rem",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              border: "1px solid rgba(100, 100, 111, 0.2)",
              typography: "body1",
              borderRadius: "10px",
              mb: "10rem",
            }}
          >
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  bgcolor: "#F4F6F8",
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    sx={{ fontSize: "12px" }}
                    label="Description"
                    value="1"
                  />
                  <Tab sx={{ fontSize: "12px" }} label="Category" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">{product.description}</TabPanel>
              <TabPanel value="2">{product.category}</TabPanel>
            </TabContext>
          </Box>
        </div>
      ))}

      {/* modal */}

      <React.Fragment>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{ maxWidth: 500 }}
          >
            <Typography>Edit the product</Typography>
            <Typography id="basic-modal-dialog-description">
              Fill in the information of the product.
            </Typography>
            <form onSubmit={(e) => editProduct(e)}>
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Brand</FormLabel>
                  <Input
                    value={brand}
                    onInput={(e:any) => setBrand(e.target.value)}
                    autoFocus
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={description}
                    onInput={(e:any) => setDescription(e.target.value)}
                    placeholder="Bootstrap"
                    minRows={2}
                    sx={{
                      "--Textarea-focusedInset": "var(--any, )",
                      "--Textarea-focusedThickness": "0.25rem",
                      "--Textarea-focusedHighlight": "rgba(13,110,253,.25)",
                      "&::before": {
                        transition: "box-shadow .15s ease-in-out",
                      },
                      "&:focus-within": {
                        borderColor: "#86b7fe",
                      },
                    }}
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
            <Typography>
              Confirmation
            </Typography>
            <Divider />
            <Typography>
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
