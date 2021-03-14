import { Grid, Typography } from "@material-ui/core";
import { TreflePlant } from "../../../Services/Plants/PlantTypes";
import PlantListItem from "../../SearchResultItem/PlantListItem";

interface Props {
  userID?: string;
  plants: TreflePlant[];
}

export default function PlantList(props: Props) {
  if (props.plants.length > 0) {
    return (
      <Grid container spacing={3}>
        {props.plants.map((p: TreflePlant, i: number) => {
          return (
            <PlantListItem
              key={i}
              plant={p}
              userID={props.userID}
            ></PlantListItem>
          );
        })}
      </Grid>
    );
  }

  return <Typography>Sorry, we couldn't find any results.</Typography>;
}
