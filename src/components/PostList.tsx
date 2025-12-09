import { Table } from "react-bootstrap";
import useGetPosts from "../hooks/useGetPosts";
import Post from "./Post";
import { PostStatusType } from "../types";
import useSearch from "../hooks/useSearch";

interface PostListProps {
  selectedStatus: PostStatusType;
  searchQuery: string;
}
const PostList = ({ selectedStatus, searchQuery }: PostListProps) => {
  const { isLoading, isError, error, data } = useGetPosts(selectedStatus);
  const searchData = useSearch(searchQuery);

  if (isLoading || searchData.isLoading) {
    return <div style={{ color: "white" }}>Loading...</div>;
  }

  if (isError) {
    return (
      <div style={{ color: "white" }}>Error: {(error as Error).message}</div>
    );
  }

  if (searchData.isError) {
    return (
      <div style={{ color: "white" }}>
        Error: {(searchData.error as Error).message}
      </div>
    );
  }
  //   const postList = data?.map((post, index) => {
  //     return (
  //       searchQuery.length === 0 && (
  //         <Post key={post.id} post={post} index={index} />
  //       )
  //     );
  //   });

  const postList =
    searchQuery.length > 0 ? (
      searchData.data?.map((post, index) => (
        <Post key={post.id} post={post} index={index} />
      ))
    ) : searchQuery.length === 0 ? (
      data?.map((post, index) => (
        <Post key={post.id} post={post} index={index} />
      ))
    ) : (
      <></>
    );

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Status</th>
          <th style={{ width: "10%" }}>Top Rate</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{postList}</tbody>
    </Table>
  );
};

export default PostList;
