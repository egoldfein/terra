import React, { useEffect, useState } from "react";
import {
  Dialog,
  Button,
  DialogActions,
  Grid,
  DialogContent,
  LinearProgress,
  Typography,
  Divider,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { TreflePlant } from "../../Services/Plants/PlantTypes";
import PlantService from "../../Services/Plants/PlantService";

interface Props {
  open: boolean;
  plantID: string;
  handleClose(): void;
}

export default function CreateListModal(props: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [plant, setPlant] = useState<TreflePlant>();
  const [loading, setLoading] = useState<boolean>(true);
  const [humidity, setHumidity] = useState<string>();
  const [light, setLight] = useState<string>();

  useEffect(() => {
    async function fn() {
      let plant = await PlantService.GetTreflePlant(props.plantID);

      if (plant.light) {
        setLight(PlantService.GetLevel(plant.light));
      }

      if (plant.humidity) {
        setHumidity(PlantService.GetLevel(plant.humidity));
      }

      setPlant(plant);
      setLoading(false);
    }

    fn();
  }, []);

  const handleClose = () => {
    props.handleClose();
  };

  return (
    <Dialog fullScreen={fullScreen} open={props.open} fullWidth>
      <DialogContent>
        {loading ? <LinearProgress /> : null}
        {plant ? (
          <React.Fragment>
            <Grid container style={{ paddingBottom: "10px" }}>
              <Typography variant="h5">{plant.common_name}</Typography>
              <Typography variant="h6">{plant.scientific_name}</Typography>
            </Grid>
            <Divider />
            {plant.humidity ? (
              <React.Fragment>
                <Typography variant="h6">Required Humidity</Typography>
                <Typography variant="body1">{humidity}</Typography>
              </React.Fragment>
            ) : null}
            {plant.light ? (
              <React.Fragment>
                <Typography variant="h6">Required Light</Typography>
                <Typography variant="body1">{light}</Typography>
              </React.Fragment>
            ) : null}
            {plant.min_precip && plant.max_precip ? (
              <React.Fragment>
                <Typography variant="h6">Precipitation Range</Typography>
                <Typography>
                  {plant.min_precip} - {plant.max_precip} mm
                </Typography>
              </React.Fragment>
            ) : null}
            {plant.min_temp && plant.max_temp ? (
              <React.Fragment>
                <Typography variant="h6">Temperature Range</Typography>
                <Typography>
                  {plant.min_temp} - {plant.max_temp} F
                </Typography>
              </React.Fragment>
            ) : null}
          </React.Fragment>
        ) : (
          <Typography variant="body1">
            Unable to load information about this plant.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="default">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
