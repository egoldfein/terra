import { shallow } from "enzyme";
import Header from "./Header";

describe("<Header />", () => {
  it("should render Header component", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
