import { createMount } from "@material-ui/core/test-utils";
import { Typography } from "@material-ui/core";
import UserPlantDetail from "./UserPlantDetail";
import MockPlantService from "../../../Services/Plants/__mocks__/PlantService";
import PlantService from "../../../Services/Plants/PlantService";
import RelativeTime from "../../../Services/Utils/TimeUtils";

describe("<UserPlantDetail />", () => {
  let mount: any;
  beforeEach(() => {
    mount = createMount({});
  });

  it("should render UserPlantDetail component", () => {
    const wrapper = mount(
      <UserPlantDetail
        plant={MockPlantService.__getOneUserPlant}
        plantDetail={MockPlantService.__getOne}
      />
    );
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should render all available plant information", () => {
    const wrapper = mount(
      <UserPlantDetail
        plant={MockPlantService.__getOneUserPlant}
        plantDetail={MockPlantService.__getOne}
      />
    );

    let userDefinedName = wrapper.find(Typography).at(0);
    expect(userDefinedName.text()).toEqual(
      MockPlantService.__getOneUserPlant.name
    );
    expect(userDefinedName.prop("variant")).toEqual("h5");

    let commonName = wrapper.find(Typography).at(1);
    expect(commonName.text()).toEqual(MockPlantService.__getOne.common_name);
    expect(commonName.prop("variant")).toEqual("body1");

    let scientificName = wrapper.find(Typography).at(2);
    expect(scientificName.text()).toEqual(
      MockPlantService.__getOne.scientific_name
    );
    expect(scientificName.prop("variant")).toEqual("body2");

    let lastWateredHeader = wrapper.find(Typography).at(3);
    let lastWateredBody = wrapper.find(Typography).at(4);
    expect(lastWateredHeader.text()).toEqual("Last Watered");
    expect(lastWateredHeader.prop("variant")).toEqual("h6");
    expect(lastWateredBody.text()).toEqual(
      RelativeTime(MockPlantService.__getOneUserPlant.last_watered)
    );
    expect(lastWateredBody.prop("variant")).toEqual("body1");

    let waterFrequencyHeader = wrapper.find(Typography).at(5);
    let waterFrequencyBody = wrapper.find(Typography).at(6);
    expect(waterFrequencyHeader.text()).toEqual("Watering Frequency");
    expect(waterFrequencyHeader.prop("variant")).toEqual("h6");
    expect(waterFrequencyBody.text()).toEqual(
      MockPlantService.__getOneUserPlant.watering_frequency?.toString()
    );
    expect(lastWateredBody.prop("variant")).toEqual("body1");

    let reqHumidityHeader = wrapper.find(Typography).at(7);
    let reqHumidityBody = wrapper.find(Typography).at(8);
    expect(reqHumidityHeader.text()).toEqual("Required Humidity");
    expect(reqHumidityHeader.prop("variant")).toEqual("h6");

    if (MockPlantService.__getOne.humidity) {
      expect(reqHumidityBody.text()).toEqual(
        PlantService.GetLevel(MockPlantService.__getOne?.humidity)
      );
    }
    expect(reqHumidityBody.prop("variant")).toEqual("body1");
  });

  it("should display plant not found", () => {
    const wrapper = mount(
      <UserPlantDetail plant={undefined} plantDetail={undefined} />
    );
    expect(wrapper.text()).toEqual("404 Plant Not Found");
  });
});
