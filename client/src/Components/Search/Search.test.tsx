import { shallow } from "enzyme";
import Search from "./Search";

describe("<Search />", () => {
  it("should render Search component", () => {
    const wrapper = shallow(
      <Search onSearch={jest.fn()} light="" edible="" search="" />
    );
    expect(wrapper.exists()).toBeTruthy();
  });
});
