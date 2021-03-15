import { shallow } from "enzyme";
import { Card, CardMedia, CardHeader, Button } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import SearchResultItem from "./SearchResultItem";
import MockPlantService from "../../../Services/Plants/__mocks__/PlantService";

describe("<SearchResultItem />", () => {
  it("should render SearchResultItem component", () => {
    const wrapper = shallow(
      <SearchResultItem plant={MockPlantService.__getOne} />
    );
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find(Card).exists()).toBeTruthy();
  });

  it("should render plant name", () => {
    const wrapper = shallow(
      <SearchResultItem plant={MockPlantService.__getOne} />
    );
    expect(wrapper.find(CardHeader).prop("title")).toContain(
      MockPlantService.__getOne.common_name
    );
  });

  it("should render image on load", () => {
    const wrapper = shallow(
      <SearchResultItem plant={MockPlantService.__getOne} />
    );
    expect(wrapper.find(Skeleton).prop("style")).toEqual({});
    expect(wrapper.find(CardMedia).prop("style")).toEqual({ display: "none" });
    wrapper.find(CardMedia).simulate("load");
    expect(wrapper.find(CardMedia).prop("style")).toEqual({});
    expect(wrapper.find(Skeleton).prop("style")).toEqual({ display: "none" });
  });
});
