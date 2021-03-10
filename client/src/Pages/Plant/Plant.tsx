import { useEffect, useState } from "react";
import { Grid, LinearProgress } from "@material-ui/core";
import PlantDetail from "../../Components/PlantDetail/PlantDetail";
import PlantService from "../../Services/Plants/PlantService";
import { Plant } from "../../Services/Plants/PlantTypes";
import { match } from "react-router-dom";

interface Params {
  id: string;
}

interface Props {
  match: match<Params>;
}

export default function PlantPage(props: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [plant, setPlant] = useState<Plant>();

  useEffect(() => {
    async function fn() {
      let plant = await PlantService.GetPlant(props.match.params.id);
      setPlant(plant);
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
          <PlantDetail plant={plant} loading={loading} />
        </Grid>
      </Grid>
    );
  }
  return <div />;
}
