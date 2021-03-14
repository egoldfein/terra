import { shallow } from "enzyme";
import Search from "./Search";
import { Button, Select, OutlinedInput, Switch } from "@material-ui/core";

describe("<Search />", () => {
  it("should render Search component", () => {
    const wrapper = shallow(
      <Search onSearch={jest.fn()} light="" edible={false} search="" />
    );
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should render all inputs within component", () => {
    let searchFn = jest.fn();
    const wrapper = shallow(
      <Search onSearch={searchFn} light="medium" edible={true} search="rose" />
    );

    expect(wrapper.find(Select).exists()).toBeTruthy();
    expect(wrapper.find(Select).prop("value")).toEqual("medium");
    expect(wrapper.find(OutlinedInput).exists()).toBeTruthy();
    expect(wrapper.find(OutlinedInput).prop("value")).toEqual("rose");
    expect(wrapper.find(Switch).exists()).toBeTruthy();
    expect(wrapper.find(Switch).prop("checked")).toEqual(true);
    expect(wrapper.find(Button).text()).toEqual("Search");
  });

  it("should call search function on submit", () => {
    let searchFn = jest.fn();
    const wrapper = shallow(
      <Search onSearch={searchFn} light="" edible={false} search="" />
    );

    wrapper.find(Button).simulate("click");
    expect(searchFn).toHaveBeenCalledTimes(1);
  });
});
