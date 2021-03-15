import React from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Grid,
  Typography,
  Link,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";

export default function Header({ user }: any) {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#283F3B" }}>
      <Toolbar>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Typography variant="h5">
            <Link color="inherit" underline="none" href="/">
              terra
            </Link>
          </Typography>
          {isAuthenticated && user ? (
            <React.Fragment>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                variant="text"
                style={{ color: "white" }}
              >
                Hello, {user.name}
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  component="a"
                  href="/user/lists"
                  onClick={handleClose}
                >
                  My Lists
                </MenuItem>
                <MenuItem onClick={() => logout()}>Logout</MenuItem>
              </Menu>
            </React.Fragment>
          ) : null}

          {!isAuthenticated && (
            <Button onClick={() => loginWithRedirect()}>Login</Button>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
