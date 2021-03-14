import { shallow } from "enzyme";
import PlantList from "./PlantList";
import PlantListItem from "../../SearchResultItem/PlantListItem";
import MockPlantService from "../../../Services/Plants/__mocks__/PlantService";

describe("<PlantList />", () => {
  it("should render PlantList component", () => {
    const wrapper = shallow(<PlantList plants={[]} />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should display no results message if PlantList is empty", () => {
    const wrapper = shallow(<PlantList plants={[]} />);
    expect(wrapper.text()).toEqual("Sorry, we couldn't find any results.");
  });

  it("should display all items in list", () => {
    const wrapper = shallow(
      <PlantList plants={MockPlantService.__getSome.plants} />
    );
    expect(wrapper.find(PlantListItem)).toHaveLength(2);
  });
});
