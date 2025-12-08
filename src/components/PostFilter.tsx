import { Form } from "react-bootstrap";
import { PostStatusType } from "../types";

interface PostFilterProps {
  selectedStatus: string;
  setSelectedStatus: (status: PostStatusType) => void;
}

const PostFilter = ({ selectedStatus, setSelectedStatus }: PostFilterProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value as PostStatusType);
  };
  return (
    <>
      <h5 style={{ color: "white" }}>Filter By Status</h5>
      <Form.Select value={selectedStatus} onChange={onChangeHandler}>
        <option value="all">Select Status</option>
        <option value="published">Published</option>
        <option value="draft">Draft</option>
        <option value="block">Block</option>
      </Form.Select>
    </>
  );
};

export default PostFilter;
