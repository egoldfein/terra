import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import UserPlantList from "./UserPlantList";
import PlantService from "../../../Services/Plants/PlantService";
import { UserPlant } from "../../../Services/Plants/PlantTypes";

describe("<UserPlantList />", () => {
  const waitForComponent = async (wrapper) => {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve));
      wrapper.update();
    });
  };

  it("should render UserPlantList component", async () => {
    const fakeUserPlant: UserPlant[] = [
      {
        name: "",
        plant_id: "1",
        id: 12,
        last_watered: "",
        watering_frequency: "daily",
      },
    ];
    jest
      .spyOn(PlantService, "GetUserPlantList")
      .mockImplementation(() => Promise.resolve(fakeUserPlant));
    await act(() => new Promise(setImmediate));
    const wrapper = mount(<UserPlantList id={"1"} />);
    await waitForComponent(wrapper);
    expect(wrapper.exists()).toBeTruthy();
  });
});
