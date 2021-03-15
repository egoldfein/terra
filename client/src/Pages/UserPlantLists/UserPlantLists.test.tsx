import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { ListItem } from "@material-ui/core";
import UserPlantListsPage from "./UserPlantLists";
import PlantService from "../../Services/Plants/PlantService";
import { UserPlantList } from "../../Services/Plants/PlantTypes";

describe("<Plant />", () => {
  let container;
  let mockUser: any = {
    sub: "123",
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
    const fakeUserPlantList: UserPlantList[] = [
      {
        name: "",
        id: "1",
        user_id: "123",
      },
    ];
    jest
      .spyOn(PlantService, "GetUserPlantLists")
      .mockImplementation(() => Promise.resolve(fakeUserPlantList));
    await act(() => new Promise(setImmediate));
    const wrapper = mount(<UserPlantListsPage user={mockUser} />);
    await waitForComponent(wrapper);
    expect(wrapper.exists()).toBeTruthy();
    let listPlants = jest.spyOn(PlantService, "GetUserPlantLists");
    expect(listPlants).toHaveBeenCalledWith("123");
    expect(wrapper.find(ListItem)).toHaveLength(2);
  });
});
