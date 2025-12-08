import { Table } from "react-bootstrap";
import useGetPosts from "../hooks/useGetPosts";
import Post from "./Post";
const PostList = () => {
  const { isLoading, isError, error, data } = useGetPosts();

  if (isLoading) {
    return <div style={{ color: "white" }}>Loading...</div>;
  }

  if (isError) {
    return (
      <div style={{ color: "white" }}>Error: {(error as Error).message}</div>
    );
  }

  const postList = data?.map((post, index) => {
    return <Post key={post.id} post={post} index={index} />;
  });
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
