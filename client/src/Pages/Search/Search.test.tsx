import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import Search from "./Search";
import SearchInput from "../../Components/Search/SearchInput/SearchInput";

describe("<Search />", () => {
  let container;
  let mockUser = {
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

  it("should render Search page", async () => {
    await act(() => new Promise(setImmediate));
    const wrapper = mount(<Search user={mockUser} />);
    await waitForComponent(wrapper);

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find(SearchInput).exists()).toBeTruthy();
  });
});
