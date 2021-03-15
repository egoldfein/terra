import { shallow } from "enzyme";
import SearchResults from "./SearchResults";
import SearchResultItem from "../SearchResultItem/SearchResultItem";
import MockPlantService from "../../../Services/Plants/__mocks__/PlantService";

describe("<SearchResults />", () => {
  it("should render SearchResults component", () => {
    const wrapper = shallow(<SearchResults plants={[]} />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should display all items in list", () => {
    const wrapper = shallow(
      <SearchResults plants={MockPlantService.__getSome.plants} />
    );
    expect(wrapper.find(SearchResultItem)).toHaveLength(2);
  });
});
