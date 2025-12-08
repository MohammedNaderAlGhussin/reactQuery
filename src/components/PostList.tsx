import { Link } from "react-router-dom";
import { Table, Form, ButtonGroup, Button } from "react-bootstrap";
import useGetPosts from "../hooks/useGetPosts";
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
      <tbody>
        {data?.map((post, index) => {
          return (
            <tr>
              <td>{++index}</td>
              <td>
                <Link to="/info">{post.title}</Link>
              </td>
              <td>{post.status}</td>
              <td style={{ textAlign: "center" }}>
                <Form.Check // prettier-ignore
                  type="switch"
                  checked={post.topRate}
                />
              </td>
              <td>
                <ButtonGroup aria-label="Basic example">
                  <Button variant="danger">Delete</Button>
                </ButtonGroup>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default PostList;
