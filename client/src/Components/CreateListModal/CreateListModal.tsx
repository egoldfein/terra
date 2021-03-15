import React from "react";
import {
  Dialog,
  Button,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

interface Props {
  open: boolean;
  handleCreate(name: string): void;
  handleClose(): void;
}

export default function CreateListModal(props: Props) {
  const [name, setName] = React.useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    props.handleClose();
  };

  const handleCreate = () => {
    props.handleCreate(name);
  };

  const onInputChange = (e: React.ChangeEvent<any>) => {
    setName(e.currentTarget.value);
  };

  return (
    <Dialog fullScreen={fullScreen} open={props.open}>
      <DialogTitle id="form-dialog-title">Create New List</DialogTitle>
      <DialogContent>
        <FormControl required fullWidth>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Give your list a name"
            fullWidth
            value={name}
            onChange={(e) => onInputChange(e)}
          />
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="default">
          Cancel
        </Button>
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
