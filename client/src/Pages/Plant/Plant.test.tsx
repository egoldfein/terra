import { shallow } from "enzyme";
import Plant from "./Plant";

describe("<Plant />", () => {
  it("should render Plant component", () => {
    const wrapper = shallow(
      <Plant
        match={{
          params: { id: "" },
          isExact: true,
          path: "",
          url: "",
        }}
      />
    );
    expect(wrapper.exists()).toBeTruthy();
  });
});
