import {
  Dialog,
  Button,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
} from "@material-ui/core";
import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useEffect } from "react";

interface Props {
  open: boolean;
  handleCreate(name: string): void;
}

export default function CreateListModal(props: Props) {
  const [name, setName] = React.useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCreate = () => {
    props.handleCreate(name);
  };

  const onInputChange = (e: React.ChangeEvent<any>) => {
    setName(e.currentTarget.value);
  };

  return (
    <Dialog fullScreen={fullScreen} open={props.open}>
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => onInputChange(e)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
