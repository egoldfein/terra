import React, { useState, useEffect, useCallback } from "react";
import history from "../../history";
import { Grid, Typography, LinearProgress } from "@material-ui/core";

import Search from "../../Components/Search/Search";
import PlantListComponent from "../../Components/PlantList/PlantList";
import PlantService from "../../Services/Plants/PlantService";
import { PlantList } from "../../Services/Plants/PlantTypes";
import Pagination from "../../Components/Pagination/Pagination";

export default function SearchPage() {
  const params = new URLSearchParams(location.search);
  const [loading, setLoading] = useState<boolean>(true);
  const [plantList, setPlantList] = useState<PlantList>();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
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
    let plants = await PlantService.ListPlants(params);

    setPlantList(plants);
    setLoading(false);
  };

  const onPageChange = async (page: number) => {
    setPage(page);
    params.set("page", page.toString());
    onSearch(params);
  };

  return (
    <Grid container spacing={3} style={{ padding: "20px" }}>
      <Grid item xs={12}>
        <Typography variant="h4">Search</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
        <Search
          onSearch={onSearch}
          light={params.get("light") || ""}
          edible={params.get("edible") || ""}
          search={params.get("search") || ""}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={10} lg={10} xl={10} direction="column">
        {loading ? (
          <LinearProgress />
        ) : plantList && plantList.plants ? (
          <React.Fragment>
            <PlantListComponent plants={plantList?.plants} />
            <Pagination
              total={plantList?.total}
              onPageChange={onPageChange}
              page={page}
            />
          </React.Fragment>
        ) : (
          <div />
        )}
      </Grid>
    </Grid>
  );
}
