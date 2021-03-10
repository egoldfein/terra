import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, LinearProgress } from "@material-ui/core";
import { Plant } from "../../Services/Plants/PlantTypes";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";

interface Props {
  loading: boolean;
  plant?: Plant;
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
    image.src = props.plant?.image_url ? props.plant.image_url : "";
    setImg(image);
  }, []);

  if (props.plant !== undefined) {
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
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h3">{props.plant.common_name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">
                <Box fontStyle="italic">{props.plant.scientific_name}</Box>
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction={"column"}
            spacing={2}
            style={{ paddingTop: "30px" }}
          >
            <Grid item xs={12}>
              <Typography variant="h6">Required Light</Typography>
              <Typography variant="body1">{props.plant.light}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Required Humidity</Typography>
              <Typography variant="body1">{props.plant.humidity}</Typography>
            </Grid>
            {props.plant.min_temp && props.plant.max_temp ? (
              <React.Fragment>
                <Grid item xs={12}>
                  <Typography variant="h6">Temperature Reange</Typography>
                  <Typography variant="body1">
                    {props.plant.min_temp.toString() +
                      "F - " +
                      props.plant.max_temp.toString() +
                      "F"}
                  </Typography>
                </Grid>
              </React.Fragment>
            ) : null}
            <Grid item xs={12}>
              <Typography variant="h6">Precipitation Range</Typography>
              <Typography variant="body1">
                {props.plant.min_precip.toString() +
                  " - " +
                  props.plant.max_precip.toString() +
                  "mm"}
              </Typography>
            </Grid>
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
  // TO DO Not Found
  return <div />;
}
