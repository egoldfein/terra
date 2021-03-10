import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Typography,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { Plant } from "../../Services/Plants/PlantTypes";
import { Link } from "react-router-dom";

interface Props {
  plant: Plant;
}

export default function PlantListItem(props: Props) {
  const [visible, setVisible] = useState<boolean>(false);
  const [img, setImg] = useState<HTMLImageElement>();

  const handleImageError = (e: any) => {
    e.target.onerror = null;
    e.target.src = "http://via.placeholder.com/140x360";
  };

  const handleImageLoad = () => {
    setVisible(true);
  };

  useEffect(() => {
    const image = new Image();
    image.onload = handleImageLoad;
    image.onerror = handleImageError;
    image.src = props.plant.image_url ? props.plant.image_url : "";
    setImg(image);
  }, []);

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={6}
      lg={3}
      xl={3}
      style={{ marginBottom: "20px", textAlign: "center" }}
    >
      <Link to={`/plant/${props.plant.id}`}>
        <Card variant="outlined">
          <CardContent>
            {visible ? (
              <CardMedia
                src={img?.src}
                component="img"
                height={140}
                onError={handleImageError}
              />
            ) : (
              <Skeleton variant="rect" height={140} animation="wave" />
            )}
            <Typography variant="body1">{props.plant.common_name}</Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
}
