import { Grid, Typography } from "@material-ui/core";
import { Plant } from "../../Services/Plants/PlantTypes";
import PlantListItem from "./PlantListItem";

interface Props {
  plants: Plant[];
}

export default function PlantList(props: Props) {
  if (props.plants.length > 0) {
    return (
      <Grid container spacing={3}>
        {props.plants.map((p: Plant, i: number) => {
          return <PlantListItem key={i} plant={p}></PlantListItem>;
        })}
      </Grid>
    );
  }

  return <Typography>Sorry, we couldn't find any results.</Typography>;
}
