import React from "react";
import { Grid, Typography } from "@material-ui/core";

export default function NotFound() {
  return (
    <React.Fragment>
      <Grid container alignContent="center" justify="center">
        <Grid item xs={12}>
          <Typography variant="h3">404 Plant Not Found</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
