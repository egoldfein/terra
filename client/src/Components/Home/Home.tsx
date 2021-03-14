import React from "react";
import { Hidden, Button, Grid, Typography } from "@material-ui/core";
import background_img_1 from "../../Assets/background.svg";
import background_img_2 from "../../Assets/background_2.svg";
import plant_img_1 from "../../Assets/plant_array.svg";

export default function Home() {
  return (
    <React.Fragment>
      <Grid
        container
        alignContent="center"
        justify="center"
        style={{
          textAlign: "center",
          backgroundImage: `url(${background_img_1})`,
          minHeight: "100vh",
          imageRendering: "-moz-crisp-edges",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
      >
        <Grid item xs={8} style={{ margin: "10px" }}>
          <Typography variant="h3">Let's find your perfect plant.</Typography>
        </Grid>
        <Grid item xs={12} style={{ paddingTop: "20px" }}>
          <Button
            href="/search"
            variant="outlined"
            size="large"
            style={{ border: "2px solid white", color: "white" }}
          >
            Get Started
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        style={{
          padding: "20px",
          background: `url(${background_img_2}), linear-gradient(180deg, rgba(153,221,200,1) 11%, rgba(255,255,255,1) 98%)`,
          minHeight: "100vh",
          imageRendering: "-moz-crisp-edges",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
        spacing={4}
      >
        <Hidden smDown={true}>
          <Grid item sm={6} md={6}>
            <img src={`${plant_img_1}`} height="auto" width="700px" />
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={12} md={4} style={{ alignSelf: "center" }}>
          <Typography variant="h4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        style={{
          padding: "20px",
          background: "white",
          minHeight: "100vh",
        }}
        spacing={4}
      >
        <Grid item xs={12}>
          <Typography variant="h4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
