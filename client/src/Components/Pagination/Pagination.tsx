import { Pagination } from "@material-ui/lab";
import { Grid } from "@material-ui/core";

interface Props {
  total: number;
  page: number;
  onPageChange(page: number): void;
}

export default function Pagiantion(props: Props) {
  const onChange = (e: object, page: number) => {
    props.onPageChange(page);
  };

  return (
    <Grid container justify="center">
      <Pagination
        page={props.page}
        count={Math.ceil(props.total / 20)}
        onChange={onChange}
      ></Pagination>
    </Grid>
  );
}
