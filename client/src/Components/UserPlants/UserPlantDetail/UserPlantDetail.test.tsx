import { createMount } from "@material-ui/core/test-utils";
import { Typography } from "@material-ui/core";
import PlantDetail from "./UserPlantDetail";
import MockPlantService from "../../../Services/Plants/__mocks__/PlantService";

describe("<PlantDetail />", () => {
  let mount: any;
  beforeEach(() => {
    mount = createMount({});
  });

  it("should render PlantDetail component", () => {
    const wrapper = mount(<PlantDetail plant={undefined} />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should render all available plant information", () => {
    const wrapper = mount(<PlantDetail plant={undefined} />);
    let commonName = wrapper.find(Typography).at(0);
    expect(commonName.text()).toEqual(MockPlantService.__getOne.common_name);
    expect(commonName.prop("variant")).toEqual("h3");

    let scientificName = wrapper.find(Typography).at(1);
    expect(scientificName.text()).toEqual(
      MockPlantService.__getOne.scientific_name
    );
    expect(scientificName.prop("variant")).toEqual("h5");

    let reqLightHeader = wrapper.find(Typography).at(2);
    let reqLightBody = wrapper.find(Typography).at(3);
    expect(reqLightHeader.text()).toEqual("Required Light");
    expect(reqLightHeader.prop("variant")).toEqual("h6");
    expect(reqLightBody.text()).toEqual(
      MockPlantService.__getOne.light?.toString()
    );
    expect(reqLightBody.prop("variant")).toEqual("body1");

    let reqHumidityHeader = wrapper.find(Typography).at(4);
    let reqHumidityBody = wrapper.find(Typography).at(5);
    expect(reqHumidityHeader.text()).toEqual("Required Humidity");
    expect(reqHumidityHeader.prop("variant")).toEqual("h6");
    expect(reqHumidityBody.text()).toEqual(
      MockPlantService.__getOne.humidity?.toString()
    );
    expect(reqHumidityBody.prop("variant")).toEqual("body1");
  });
});
