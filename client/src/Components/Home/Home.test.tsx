import { shallow } from "enzyme";
import Home from "./Home";

describe("<Home />", () => {
  it("should render Home component", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
