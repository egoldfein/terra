import { Switch, Route } from "react-router-dom";
import { Router } from "react-router";
import history from "./history";
import Home from "./Pages/Home/Home";
import Search from "./Pages/Search/Search";
import Plant from "./Pages/UserPlantDetail/UserPlantDetail";
import Header from "./Components/Header/Header";
import UserPlantLists from "./Pages/UserPlantLists/UserPlantLists";
import UserPlantList from "./Components/UserPlants/UserPlantList/UserPlantList";
import { LinearProgress } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";

import "./App.css";

function App() {
  const { isLoading, user } = useAuth0();

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <div>
      <Header user={user} />
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search" render={() => <Search user={user} />} />
          <Route path="/plant/:id" render={(props) => <Plant {...props} />} />
          <Route
            path="/user/lists"
            render={() => <UserPlantLists user={user} />}
          />
          <Route
            path="/list/:id"
            render={(props: any) => <UserPlantList {...props} user={user} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
