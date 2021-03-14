import { useState, useEffect } from "react";
import {
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
import { UserPlant } from "../../../Services/Plants/PlantTypes";
import PlantService from "../../../Services/Plants/PlantService";
import OpacityIcon from "@material-ui/icons/Opacity";
interface Props {
  id: string;
}

export default function UserPlantListPage(props: Props) {
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
              <Card variant="outlined">
                <CardHeader
                  action={
                    <IconButton
                      aria-label="add"
                      onClick={() => markWatered(plant.id.toString())}
                    >
                      <OpacityIcon />
                    </IconButton>
                  }
                  title={plant.name}
                  titleTypographyProps={{ variant: "body2", align: "left" }}
                />
                <CardContent>
                  <CardActions disableSpacing>
                    <Button size="small" href={`/plant/${plant.id}`}>
                      See Details
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
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
