import styles from "@/styles/slug.module.scss";
import star from "@/assets/svg/star.svg";
import starWhite from "@/assets/svg/starWhite.svg";
import deleteSVG from "@/assets/svg/delete2.svg";
import editSVG from "@/assets/svg/edit.svg";
import img from "@/assets/IMG.png";
import LabTabs from "./Tabs";
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

export default function Slug() {
  const router = useRouter();

  const images = [1, 2, 3, 4, 5];
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <button type="button" className={[styles.edit, styles.margin].join(" ")} onClick={() => router.back()}>
        Back to home page
      </button>
      <div className={[styles.flex, styles.px1, styles.gap40].join(" ")}>
        <div>
          <Card
            sx={{
              maxWidth: 500,
              height: {default: 300, sm: 500},
              borderRadius: "10px",
              boxShadow: "0px 8px 16px #eaeff0",
            }}
          >
            <CardMedia
              component="img"
              height="500"
              image="https://media.istockphoto.com/id/1093110112/photo/picturesque-morning-in-plitvice-national-park-colorful-spring-scene-of-green-forest-with-pure.jpg?s=612x612&w=0&k=20&c=lpQ1sQI49bYbTp9WQ_EfVltAqSP1DXg0Ia7APTjjxz4="
              alt="Paella dish"
            />
          </Card>
          <div className={styles.imageGroup}>
            {images.map((image) => (
              <Image
                key={image}
                src={img}
                className={styles.selected}
                alt=""
                width={64}
                height={64}
              />
            ))}
          </div>
        </div>
        <div>
          <button className={styles.brand}>Brand</button>
          <h2>AE 24/7 Active Hoodie With Gaiter</h2>
          <div>
            <Image src={star} alt="" width={14} height={14} />
            <Image src={star} alt="" width={14} height={14} />
            <Image src={star} alt="" width={14} height={14} />
            <Image src={star} alt="" width={14} height={14} />
            <Image src={starWhite} alt="" width={14} height={14} />
            <span className={styles.stars}>4.54</span>
          </div>
          <p className={styles.flex}>
            <span className={styles.discount}>$62.97</span>
            <span className={styles.price}>$62.97</span>
          </p>
          <div className={styles.btnGroup}>
            <button className={styles.edit}>
              <Image src={editSVG} alt="edit" width={20} height={20} />
              Изменить
            </button>
            <button className={styles.delete}>
              <Image src={deleteSVG} alt="delete" width={16} height={16} />
              Удалить
            </button>
          </div>
        </div>
      </div>
      <LabTabs />
    </>
  );
}
