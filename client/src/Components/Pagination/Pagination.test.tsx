import { createMount } from "@material-ui/core/test-utils";
import { Pagination } from "@material-ui/lab";
import PaginationComponent from "./Pagination";

describe("<Pagination />", () => {
  let mount: any;
  beforeEach(() => {
    mount = createMount();
  });
  let onPageChangeFn = jest.fn();

  it("should render Pagination component", () => {
    const wrapper = mount(
      <PaginationComponent page={1} total={100} onPageChange={onPageChangeFn} />
    );
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should call onPageChange when page is clicked", () => {
    const wrapper = mount(
      <PaginationComponent page={1} total={100} onPageChange={onPageChangeFn} />
    );
    wrapper.find(Pagination).find("button").at(5).simulate("click");
    expect(onPageChangeFn).toHaveBeenCalledTimes(1);
    expect(onPageChangeFn).toHaveBeenCalledWith(5);
  });
});
