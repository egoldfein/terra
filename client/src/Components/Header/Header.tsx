import {
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Typography,
  Link,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

export default function Header() {
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
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
