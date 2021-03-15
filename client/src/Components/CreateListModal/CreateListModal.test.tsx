import { shallow } from "enzyme";
import { Button, TextField } from "@material-ui/core";
import CreateListModal from "./CreateListModal";

describe("<CreateListModal />", () => {
  const handleCreate = jest.fn();
  const handleClose = jest.fn();
  const wrapper = shallow(
    <CreateListModal
      open={true}
      handleCreate={handleCreate}
      handleClose={handleClose}
    />
  );
  it("should render CreateListModal component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should call the handle create function on submit click", () => {
    wrapper
      .find(TextField)
      .simulate("change", { currentTarget: { value: "My first list" } });
    wrapper.find(Button).at(1).simulate("click");
    expect(handleCreate).toHaveBeenCalledTimes(1);
    expect(handleCreate).toHaveBeenCalledWith("My first list");
  });

  it("should call the handle close function on cancel click", () => {
    wrapper.find(Button).at(0).simulate("click");
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
