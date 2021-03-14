import { shallow } from "enzyme";
import Header from "./Header";
import { Link } from "@material-ui/core";

describe("<Header />", () => {
  const wrapper = shallow(<Header />);

  it("should render Header component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should include link to Home", () => {
    expect(wrapper.find(Link).prop("href")).toEqual("/");
    expect(wrapper.find(Link).text()).toEqual("terra");
  });
});
