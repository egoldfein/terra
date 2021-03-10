import { shallow } from "enzyme";
import PlantDetail from "./PlantDetail";

describe("<PlantDetail />", () => {
  it("should render PlantDetail component", () => {
    const wrapper = shallow(<PlantDetail loading={true} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
