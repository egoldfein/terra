import {
  Dialog,
  Button,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
} from "@material-ui/core";
import { useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useEffect } from "react";
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
        <Select value={listID} onChange={(e) => onListSelectChange(e)}>
          <option value=""></option>
          {plantLists.map((list: UserPlantList, i: number) => {
            return (
              <option key={i} value={list.id}>
                {list.name}
              </option>
            );
          })}
        </Select>
        <Select value={frequency} onChange={(e) => onFrequencySelectChange(e)}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="bi-weekly">Every two weeks</option>
          <option value="monthly">Monthly</option>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
