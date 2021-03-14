import React, { useState, useEffect } from "react";
import { List, ListItem, Grid } from "@material-ui/core";
import { UserPlantList } from "../../Services/Plants/PlantTypes";
import PlantService from "../../Services/Plants/PlantService";
import UserPlantListComponent from "../../Components/UserPlants/UserPlantList/UserPlantList";
import CreateListModal from "../../Components/CreateListModal/CreateListModal";
import AddIcon from "@material-ui/icons/Add";

export default function UserPlantListsPage({ user }: any) {
  const [plantLists, setPlantLists] = useState<UserPlantList[]>([]);
  const [selectedList, setSelectedList] = useState<string>("");
  const [userID, setUserID] = useState<string>("");
  const [createListOpen, setCreateListOpen] = useState<boolean>(false);

  useEffect(() => {
    async function fn() {
      let userID = user.sub.replace("auth0|", "");
      let lists = await PlantService.GetUserPlantLists(userID);
      setUserID(userID);
      setPlantLists(lists);
      setSelectedList(lists[0].id);
    }
    fn();
  }, []);

  const createPlantList = async (name: string) => {
    await PlantService.AddUserList(name, userID);
    setCreateListOpen(false);
    await refreshList();
  };

  const refreshList = async () => {
    let lists = await PlantService.GetUserPlantLists(userID);
    setPlantLists(lists);
  };

  if (!user) {
    return <div>You must be logged in to view your lists</div>;
  }

  return (
    <React.Fragment>
      <CreateListModal open={createListOpen} handleCreate={createPlantList} />
      <Grid container spacing={3} style={{ padding: "20px" }}>
        <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
          <List>
            <ListItem button onClick={() => setCreateListOpen(true)}>
              <AddIcon />
              Create New List
            </ListItem>
            {plantLists.map((plantList: UserPlantList, i: number) => {
              return (
                <ListItem
                  selected={selectedList === plantList.id}
                  button
                  key={i}
                  onClick={() => setSelectedList(plantList.id)}
                >
                  {plantList.name}
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
          <UserPlantListComponent id={selectedList} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
