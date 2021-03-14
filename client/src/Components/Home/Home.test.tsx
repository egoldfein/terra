import { shallow } from "enzyme";
import { Button } from "@material-ui/core";
import Home from "./Home";

describe("<Home />", () => {
  it("should render Home component", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should include button with Link to Search", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find(Button).exists()).toBeTruthy();
    expect(wrapper.find(Button).prop("href")).toEqual("/search");
  });
});
