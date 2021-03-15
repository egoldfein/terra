import { useState, useEffect } from "react";
import {
  Dialog,
  Button,
  InputLabel,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  FormControl,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { UserPlantList } from "../../Services/Plants/PlantTypes";
import PlantService from "../../Services/Plants/PlantService";

interface Props {
  userID?: string;
  open: boolean;
  plantID: string;
  handleAdd(
    name: string,
    listID: string,
    plantID: string,
    frequency: string
  ): void;
  handleClose(): void;
}

export default function AddPlantModal(props: Props) {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("");
  const [listID, setListID] = useState("");
  const [plantLists, setPlantLists] = useState<UserPlantList[]>([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    async function fn() {
      if (props.userID) {
        let plantLists = await PlantService.GetUserPlantLists(props.userID);
        setPlantLists(plantLists);
      }
    }

    fn();
  }, []);

  const handleClose = () => {
    props.handleClose();
  };

  const handleAdd = () => {
    props.handleAdd(name, listID, props.plantID, frequency);
  };

  const onInputChange = (e: React.ChangeEvent<any>) => {
    setName(e.currentTarget.value);
  };

  const onListSelectChange = (e: React.ChangeEvent<any>) => {
    setListID(e.target.value);
  };

  const onFrequencySelectChange = (e: React.ChangeEvent<any>) => {
    setFrequency(e.target.value);
  };

  return (
    <Dialog fullScreen={fullScreen} open={props.open}>
      <DialogTitle id="form-dialog-title">Add Plant to List</DialogTitle>
      <DialogContent>
        <FormControl required fullWidth>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Give your plant a name"
            value={name}
            onChange={(e) => onInputChange(e)}
          />
        </FormControl>
        <FormControl required fullWidth>
          <InputLabel id="list-label">Select List</InputLabel>
          <Select
            labelId="list-label"
            value={listID}
            onChange={(e) => onListSelectChange(e)}
          >
            <option value=""></option>
            {plantLists.map((list: UserPlantList, i: number) => {
              return (
                <option key={i} value={list.id}>
                  {list.name}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <FormControl required fullWidth>
          <InputLabel id="frequency-label">
            Select watering frequency
          </InputLabel>
          <Select
            labelId="frequency-label"
            value={frequency}
            onChange={(e) => onFrequencySelectChange(e)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Every two weeks</option>
            <option value="monthly">Monthly</option>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="default">
          Close
        </Button>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
