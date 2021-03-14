import { shallow } from "enzyme";
import { Card, CardMedia, Link, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import PlantListItem from "./PlantListItem";
import MockPlantService from "../../Services/Plants/__mocks__/PlantService";

// TODO add plant detail props
describe("<PlantListItem />", () => {
  it("should render PlantListItem component", () => {
    const wrapper = shallow(
      <PlantListItem plant={MockPlantService.__getOne} />
    );
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find(Card).exists()).toBeTruthy();
  });

  it("should render plant name", () => {
    const wrapper = shallow(
      <PlantListItem plant={MockPlantService.__getOne} />
    );
    expect(wrapper.find(Typography).text()).toEqual(
      MockPlantService.__getOne.common_name
    );
    expect(wrapper.find(Typography).prop("variant")).toEqual("body1");
  });

  it("should render link to detail page", () => {
    const wrapper = shallow(
      <PlantListItem plant={MockPlantService.__getOne} />
    );
    expect(wrapper.find(Link).prop("href")).toEqual(
      `/plant/${MockPlantService.__getOne.id}`
    );
  });

  it("should render image on load", () => {
    const wrapper = shallow(
      <PlantListItem plant={MockPlantService.__getOne} />
    );
    expect(wrapper.find(Skeleton).prop("style")).toEqual({});
    expect(wrapper.find(CardMedia).prop("style")).toEqual({ display: "none" });
    wrapper.find(CardMedia).simulate("load");
    expect(wrapper.find(CardMedia).prop("style")).toEqual({});
    expect(wrapper.find(Skeleton).prop("style")).toEqual({ display: "none" });
  });
});
