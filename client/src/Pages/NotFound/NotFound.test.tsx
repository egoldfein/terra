import { shallow } from "enzyme";
import NotFound from "./NotFound";

describe("<NotFound />", () => {
  it("should render NotFound component", () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
