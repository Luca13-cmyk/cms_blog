import React from "react";
import Muipagination from "@mui/material/Pagination";
import Post from "../model/Post";
interface IProps {
  posts: { node: Post }[];
  currentPage: number;
  postsPerPage: number;
  paginate: (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => void | JSX.Element;
}
const Pagination = ({ posts, currentPage, paginate, postsPerPage }: IProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <Muipagination
        color="standard"
        shape="rounded"
        defaultPage={1}
        count={Math.ceil(posts.length / postsPerPage)}
        page={currentPage}
        onChange={(event, value) => paginate(event, value)}
        size="large"
      />
    </div>
  );
};

export default Pagination;
