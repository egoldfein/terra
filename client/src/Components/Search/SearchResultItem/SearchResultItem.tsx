import React, { useState } from "react";
import {
  Grid,
  Button,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import { TreflePlant } from "../../../Services/Plants/PlantTypes";
import PlantService from "../../../Services/Plants/PlantService";
import AddPlantModal from "../../AddPlantModal/AddPlantModal";
import PlantInfoModal from "../../PlantInfoModal/PlantInfoModal";

interface Props {
  userID?: string;
  plant: TreflePlant;
}

export default function SearchResultItem(props: Props) {
  const [visible, setVisible] = useState<boolean>(false);
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [infoOpen, setInfoOpen] = useState<boolean>(false);

  function handleImageError(e: any) {
    e.target.onerror = null;
    e.target.src = "http://via.placeholder.com/140x360";
  }

  const addPlantToList = async (
    name: string,
    listID: string,
    plantID: string,
    frequency: string
  ) => {
    await PlantService.AddUserPlant(name, listID, plantID, frequency);
    setAddOpen(false);
  };

  const handleClose = () => {
    setInfoOpen(false);
    setAddOpen(false);
  };

  return (
    <React.Fragment>
      <AddPlantModal
        open={addOpen}
        userID={props.userID}
        plantID={props.plant.id.toString()}
        handleAdd={addPlantToList}
        handleClose={handleClose}
      />
      <PlantInfoModal
        open={infoOpen}
        plantID={props.plant.id.toString()}
        handleClose={handleClose}
      />
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={3}
        xl={3}
        style={{ marginBottom: "20px", textAlign: "center" }}
      >
        <Card variant="outlined">
          <CardHeader
            action={
              <IconButton
                disabled={!props.userID}
                aria-label="add"
                onClick={() => setAddOpen(true)}
              >
                <AddIcon />
              </IconButton>
            }
            title={props.plant.common_name}
            titleTypographyProps={{ variant: "body2", align: "left" }}
            subheader={props.plant.scientific_name}
            subheaderTypographyProps={{ variant: "body2", align: "left" }}
          />

          <CardMedia
            src={props.plant.image_url}
            style={visible ? {} : { display: "none" }}
            component="img"
            height={140}
            onError={handleImageError}
            onLoad={() => setVisible(true)}
          />
          <Skeleton
            variant="rect"
            height={140}
            animation="wave"
            style={visible ? { display: "none" } : {}}
          />
          <CardContent>
            <CardActions disableSpacing>
              <Button size="small" onClick={() => setInfoOpen(true)}>
                Learn More
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
