import { mount } from "enzyme";
import { render } from "@testing-library/react";
import Plant from "./UserPlantDetail";
import PlantService from "../../Services/Plants/PlantService";

describe("<Plant />", () => {
  const params = {
    params: { id: "123" },
    isExact: true,
    path: "",
    url: "",
  };

  it("should render Plant component", () => {
    const wrapper = mount(<Plant match={params} />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should call get plant with id in params", () => {
    let getPlant = jest.spyOn(PlantService, "GetTreflePlant");
    render(<Plant match={params} />);
    expect(getPlant).toHaveBeenCalledWith("123");
  });
});
