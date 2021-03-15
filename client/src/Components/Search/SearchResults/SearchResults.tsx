import { Grid, Typography } from "@material-ui/core";
import { TreflePlant } from "../../../Services/Plants/PlantTypes";
import SearchResultItem from "../SearchResultItem/SearchResultItem";

interface Props {
  userID?: string;
  plants: TreflePlant[];
}

export default function SearchResults(props: Props) {
  if (props.plants.length > 0) {
    return (
      <Grid container spacing={3}>
        {props.plants.map((p: TreflePlant, i: number) => {
          return (
            <SearchResultItem
              key={i}
              plant={p}
              userID={props.userID}
            ></SearchResultItem>
          );
        })}
      </Grid>
    );
  }

  return null;
}
