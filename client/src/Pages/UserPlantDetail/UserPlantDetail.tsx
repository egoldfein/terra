import { useEffect, useState } from "react";
import { Grid, LinearProgress } from "@material-ui/core";
import PlantDetail from "../../Components/UserPlants/UserPlantDetail/UserPlantDetail";
import PlantService from "../../Services/Plants/PlantService";
import { UserPlant, TreflePlant } from "../../Services/Plants/PlantTypes";
import { match } from "react-router-dom";

interface Params {
  id: string;
}

interface Props {
  match: match<Params>;
}

export default function PlantPage(props: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [plant, setPlant] = useState<UserPlant>();
  const [plantDetail, setPlantDetail] = useState<TreflePlant>();

  useEffect(() => {
    async function fn() {
      let plant = await PlantService.GetUserPlant(props.match.params.id);
      let plantDetail = await PlantService.GetTreflePlant(plant.plant_id);
      setPlant(plant);
      setPlantDetail(plantDetail);
      setLoading(false);
    }

    fn();
  }, []);

  if (loading) {
    return <LinearProgress />;
  }

  if (plant !== undefined) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PlantDetail plant={plant} plantDetail={plantDetail} />
        </Grid>
      </Grid>
    );
  }
  return <div />;
}
