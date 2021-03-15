import React, { useState, useEffect } from "react";
import { Grid, Typography, LinearProgress } from "@material-ui/core";
import history from "../../history";
import { TreflePlantList } from "../../Services/Plants/PlantTypes";
import SearchInput from "../../Components/Search/SearchInput/SearchInput";
import SearchResults from "../../Components/Search/SearchResults/SearchResults";
import Pagination from "../../Components/Pagination/Pagination";
import PlantService from "../../Services/Plants/PlantService";

export default function SearchPage({ user }: any) {
  const params = new URLSearchParams(location.search);
  const [loading, setLoading] = useState<boolean>(true);
  const [plantList, setPlantList] = useState<TreflePlantList>();
  const [page, setPage] = useState<number>(1);
  const [userID, setUserID] = useState<string>("");

  useEffect(() => {
    setUserID(user.sub.replace("auth0|", ""));

    async function fn() {
      let page = params.get("page");
      if (page) {
        setPage(parseInt(page));
      }
      await onSearch(params);
    }
    fn();
  }, []);

  const onSearch = async (params: URLSearchParams) => {
    setLoading(true);

    history.push("/search?" + params.toString());
    let plants = await PlantService.ListTreflePlants(params);

    setPlantList(plants);
    setLoading(false);
  };

  const onPageChange = async (page: number) => {
    setPage(page);
    params.set("page", page.toString());
    onSearch(params);
  };

  let searchString = params.get("search");
  return (
    <React.Fragment>
      <Grid container spacing={3} style={{ padding: "20px" }}>
        <Grid item xs={12}>
          <Typography variant="h4">Search</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
          <SearchInput
            onSearch={onSearch}
            light={params.get("light") || ""}
            edible={params.get("edible") === "true"}
            search={searchString ? decodeURI(searchString) : ""}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
          {loading ? (
            <LinearProgress />
          ) : plantList && plantList.plants ? (
            <React.Fragment>
              <SearchResults plants={plantList?.plants} userID={userID} />
              <Pagination
                total={plantList?.total}
                onPageChange={onPageChange}
                page={page}
              />
            </React.Fragment>
          ) : (
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                sm={12}
                md={10}
                lg={10}
                xl={10}
                style={{ textAlign: "center" }}
              >
                <Typography variant="body1">No results</Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
