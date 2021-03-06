import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import UserPlantDetail from "./UserPlantDetail";
import PlantService from "../../Services/Plants/PlantService";
import { UserPlant } from "../../Services/Plants/PlantTypes";

describe("<Plant />", () => {
  let container;
  const params = {
    params: { id: "123" },
    isExact: true,
    path: "",
    url: "",
  };

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  const waitForComponent = async (wrapper) => {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve));
      wrapper.update();
    });
  };

  it("should call get plant with id in params", async () => {
    const fakeUserPlant: UserPlant = {
      plant_id: "123",
      name: "",
      id: 12,
      last_watered: "",
      watering_frequency: "daily",
    };
    jest
      .spyOn(PlantService, "GetUserPlant")
      .mockImplementation(() => Promise.resolve(fakeUserPlant));
    await act(() => new Promise(setImmediate));
    const wrapper = mount(<UserPlantDetail match={params} />);
    await waitForComponent(wrapper);
    expect(wrapper.exists()).toBeTruthy();
    let getPlant = jest.spyOn(PlantService, "GetUserPlant");
    expect(getPlant).toHaveBeenCalledWith("123");
  });
});
