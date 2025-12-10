import { Link } from "react-router-dom";
import { Form, ButtonGroup, Button } from "react-bootstrap";
import { PostItem, PostStatusType } from "../types";
import useRemovePost from "../hooks/useRemovePost";

interface PostProps {
  post: PostItem;
  index: number;
  type?: string;
  paginate?: number;
  searchQuery?: string;
  selectedStatus?: PostStatusType;
}

const Post = ({
  post,
  index,
  type,
  paginate,
  searchQuery,
  selectedStatus,
}: PostProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle the change event for the switch
    console.log(`Post ${post.id} topRate changed to ${e.target.checked}`);
  };
  const deleteAction = useRemovePost();
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
          <Button
            variant="danger"
            disabled={deleteAction.isPending}
            onClick={() => deleteAction.mutate(post.id)}
          >
            Delete
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );
};

export default Post;
