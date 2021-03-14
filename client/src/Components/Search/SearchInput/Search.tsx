import React, { useState } from "react";
import {
  Button,
  Grid,
  Select,
  Typography,
  OutlinedInput,
  InputAdornment,
  Switch,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

interface Props {
  light: string;
  edible: boolean;
  search: string;
  onSearch: (params: URLSearchParams) => void;
}

const params = new URLSearchParams();
export default function Search(props: Props) {
  const [light, setLight] = useState<string>(props.light);
  const [edible, setEdible] = useState<boolean>(props.edible);
  const [search, setSearch] = useState<string>(props.search);

  const onSelectChange = (e: React.ChangeEvent<any>) => {
    setLight(e.target.value);
  };

  const onSwitchChange = (e: React.ChangeEvent<any>) => {
    setEdible(e.target.checked);
  };

  const onInputChange = (e: React.ChangeEvent<any>) => {
    setSearch(e.currentTarget.value);
  };

  const onSubmit = async () => {
    params.set("light", light);
    params.set("edible", edible ? "true" : "");
    params.set("search", search);
    params.set("page", "");
    props.onSearch(params);
  };

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item xs={12} sm={12}>
        <OutlinedInput
          value={search}
          id="outlined-adornment-search"
          onChange={(e) => onInputChange(e)}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
          labelWidth={70}
        />
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant={"body1"}>Light level?</Typography>
        <Select
          id="light-levels"
          value={light}
          onChange={(e) => onSelectChange(e)}
        >
          <option value={""}></option>
          <option value={"low"}>Low</option>
          <option value={"medium"}>Medium</option>
          <option value={"high"}>High</option>
        </Select>
      </Grid>
      <Grid
        item
        xs={12}
        style={{ display: "inline-flex", alignItems: "center" }}
      >
        <Typography variant={"body1"}>Edible?</Typography>
        <Grid
          component="label"
          container
          alignItems="center"
          spacing={1}
          justify="center"
        >
          <Grid item>No</Grid>
          <Grid item>
            <Switch checked={edible} onChange={(e) => onSwitchChange(e)} />
          </Grid>
          <Grid item>Yes</Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          size="large"
          style={{ border: "2px solid white", color: "white" }}
          onClick={onSubmit}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
}
