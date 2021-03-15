import { shallow } from "enzyme";
import PlantInfoModal from "./PlantInfoModal";

describe("<PlantInfoModal />", () => {
  const handleClose = jest.fn();
  const wrapper = shallow(
    <PlantInfoModal open={true} handleClose={handleClose} plantID={"1"} />
  );
  it("should render PlantInfoModal component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
