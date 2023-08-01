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

export default function Cards() {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <div
        className={[
          styles.grid,
          styles.px1,
          styles.gap40,
        ].join(" ")}
      >
        {cards.map((card) => (
          <Card
            key={card}
            sx={{
              maxWidth: 344,
              borderRadius: "15px",
              boxShadow: "0px 8px 16px #eaeff0",
              pb: "16px"
            }}
          >
            <Link href={`/${card}`}>
              <CardMedia
                component="img"
                height="344"
                width="344"
                sx={{ cursor: "pointer" }}
                image="https://media.istockphoto.com/id/1093110112/photo/picturesque-morning-in-plitvice-national-park-colorful-spring-scene-of-green-forest-with-pure.jpg?s=612x612&w=0&k=20&c=lpQ1sQI49bYbTp9WQ_EfVltAqSP1DXg0Ia7APTjjxz4="
                alt="Paella dish"
              />
            </Link>
            <CardContent>
              <Typography
                variant="body2"
                className={[styles.fontweight, styles.fs14].join(" ")}
              >
                Bárbara Cotilla
              </Typography>
            </CardContent>
            <div className={[styles.flex].join(" ")}>
              <CardContent>
                <Typography className={[styles.fontweight, styles.fs16].join(" ")} variant="body2">
                    $28.56
                </Typography>
              </CardContent>
              <div className={styles.actions}>
                <div className={styles.edit}>
                  <Image src={editSVG} alt="delete" width={30} height={30} />
                </div>
                <div className={styles.delete}>
                  <Image src={deleteSVG} alt="delete" width={30} height={30} />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
