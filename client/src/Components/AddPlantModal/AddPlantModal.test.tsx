import { shallow } from "enzyme";
import { Button, TextField, Select } from "@material-ui/core";
import AddPlantModal from "./AddPlantModal";

describe("<AddPlantModal />", () => {
  const handleAdd = jest.fn();
  const handleClose = jest.fn();
  const wrapper = shallow(
    <AddPlantModal
      open={true}
      plantID={"1"}
      handleAdd={handleAdd}
      handleClose={handleClose}
    />
  );
  it("should render AddPlantModal component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should call the handle add function on button click", () => {
    wrapper
      .find(TextField)
      .simulate("change", { currentTarget: { value: "My first plant" } });

    wrapper
      .find(Select)
      .at(0)
      .simulate("change", { target: { value: "My list" } });

    wrapper
      .find(Select)
      .at(1)
      .simulate("change", { target: { value: "daily" } });

    wrapper.find(Button).at(1).simulate("click");
    expect(handleAdd).toHaveBeenCalledTimes(1);
    expect(handleAdd).toHaveBeenCalledWith(
      "My first plant",
      "My list",
      "1",
      "daily"
    );
  });

  it("should call the handle close function on cancel click", () => {
    wrapper.find(Button).at(0).simulate("click");
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
