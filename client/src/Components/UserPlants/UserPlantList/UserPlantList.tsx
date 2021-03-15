import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Typography,
  IconButton,
  Grid,
  LinearProgress,
} from "@material-ui/core";
import OpacityIcon from "@material-ui/icons/Opacity";
import { UserPlant } from "../../../Services/Plants/PlantTypes";
import PlantService from "../../../Services/Plants/PlantService";
import RelativeDate from "../../../Services/Utils/TimeUtils";

interface Props {
  id: string;
}

export default function UserPlantList(props: Props) {
  const [plants, setPlants] = useState<UserPlant[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fn() {
      setLoading(true);
      let plants = await PlantService.GetUserPlantList(props.id);
      setPlants(plants);
      setLoading(false);
    }
    fn();
  }, [props.id]);

  const markWatered = async (id: string) => {
    let date = new Date().getTime().toString();
    await PlantService.UpdateLastWatered(id, date);
  };

  if (loading) {
    return <LinearProgress />;
  }

  if (plants && plants.length > 0) {
    return (
      <Grid container spacing={3}>
        {plants?.map((plant: UserPlant, i: number) => {
          let lastWatered = RelativeDate(plant.last_watered);
          return (
            <Grid
              item
              key={i}
              xs={12}
              sm={12}
              md={6}
              lg={3}
              xl={3}
              style={{ marginBottom: "20px", textAlign: "center" }}
            >
              <Card variant="outlined">
                <CardHeader
                  action={
                    <IconButton
                      aria-label="marked-watered"
                      onClick={() => markWatered(plant.id.toString())}
                    >
                      <OpacityIcon />
                    </IconButton>
                  }
                  title={plant.name}
                  titleTypographyProps={{ variant: "body1", align: "left" }}
                />
                <CardContent style={{ textAlign: "left" }}>
                  <Box fontWeight="fontWeightBold">
                    <Typography variant="body2">Last Watered</Typography>
                  </Box>
                  <Typography variant="body2">{lastWatered}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <Button size="small" href={`/plant/${plant.id}`}>
                    See Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  }

  return (
    <Grid
      container
      spacing={3}
      justify="center"
      alignContent="center"
      style={{ textAlign: "center", paddingTop: "50px" }}
    >
      <Grid item xs={12}>
        <Typography>
          You currently don't have any plants in this list.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button size="small" href={`/search`}>
          Search for plants to add
        </Button>
      </Grid>
    </Grid>
  );
}
