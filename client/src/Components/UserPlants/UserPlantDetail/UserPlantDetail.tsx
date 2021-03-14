import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { UserPlant, TreflePlant } from "../../../Services/Plants/PlantTypes";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";

interface Props {
  plant?: UserPlant;
  plantDetail?: TreflePlant;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    info: {
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
      },
      [theme.breakpoints.up("md")]: {
        textAlign: "left",
      },
    },
  })
);

export default function PlantDetail(props: Props) {
  const classes = useStyles();
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
    image.src = props.plantDetail?.image_url ? props.plantDetail.image_url : "";

    setImg(image);
  }, []);

  if (props.plant !== undefined && props.plantDetail !== undefined) {
    return (
      <Grid
        style={{ textAlign: "center", paddingTop: "50px" }}
        container
        justify="center"
        alignContent="center"
        spacing={1}
      >
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          {visible ? (
            <img
              src={img?.src}
              height="500px"
              width="400px"
              onError={handleImageError}
              style={{ objectFit: "scale-down" }}
            />
          ) : (
            <Skeleton
              variant="rect"
              height={500}
              width={400}
              animation="wave"
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={4}
          className={classes.info}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h5">{props.plant.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                {props.plantDetail.common_name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                <Box fontStyle="italic">
                  {props.plantDetail.scientific_name}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Last Watered</Typography>
              <Typography variant="body1">
                {props.plant.last_watered}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Watering Frequency</Typography>
              <Typography variant="body1">
                {props.plant.watering_frequency}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction={"column"}
            spacing={2}
            style={{ paddingTop: "30px" }}
          >
            {props.plantDetail.light ? (
              <Grid item xs={12}>
                <Typography variant="h6">Required Light</Typography>
                <Typography variant="body1">
                  {props.plantDetail.light}
                </Typography>
              </Grid>
            ) : null}
            {props.plantDetail.humidity ? (
              <Grid item xs={12}>
                <Typography variant="h6">Required Humidity</Typography>
                <Typography variant="body1">
                  {props.plantDetail.humidity}
                </Typography>
              </Grid>
            ) : null}
            {props.plantDetail.min_temp && props.plantDetail.max_temp ? (
              <Grid item xs={12}>
                <Typography variant="h6">Temperature Range</Typography>
                <Typography variant="body1">
                  {props.plantDetail.min_temp.toString() +
                    "F - " +
                    props.plantDetail.max_temp.toString() +
                    "F"}
                </Typography>
              </Grid>
            ) : null}
            {props.plantDetail.min_precip && props.plantDetail.max_precip ? (
              <Grid item xs={12}>
                <Typography variant="h6">Precipitation Range</Typography>
                <Typography variant="body1">
                  {props.plantDetail.min_precip.toString() +
                    " - " +
                    props.plantDetail.max_precip.toString() +
                    "mm"}
                </Typography>
              </Grid>
            ) : null}
            <Grid item xs={12}>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  // TODO Not Found
  return <div />;
}
