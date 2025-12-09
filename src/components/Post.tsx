import { Link } from "react-router-dom";
import { Form, ButtonGroup, Button } from "react-bootstrap";
import { PostItem } from "../types";

interface PostProps {
  post: PostItem;
  index: number;
  type?: string;
  paginate?: number;
  searchQuery?: string;
}

const Post = ({ post, index, type, paginate, searchQuery }: PostProps) => {
  console.log(paginate);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle the change event for the switch
    console.log(`Post ${post.id} topRate changed to ${e.target.checked}`);
  };
  return (
    <tr>
      <td>{++index}</td>
      <td>
        {type === "paginate" ? (
          <Link to={`/info?id=${post.id}&type=paginate&key=${paginate}`}>
            {post.title}
          </Link>
        ) : (
          <Link to={`/info?id=${post.id}&type=search&key=${searchQuery}`}>
            {post.title}
          </Link>
        )}
      </td>
      <td>{post.status}</td>
      <td style={{ textAlign: "center" }}>
        <Form.Check // prettier-ignore
          type="switch"
          checked={post.topRate}
          onChange={onChangeHandler}
        />
      </td>
      <td>
        <ButtonGroup aria-label="Basic example">
          <Button variant="danger">Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  );
};

export default Post;
