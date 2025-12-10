import { Col, Row, Form, Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import useGetPost from "../hooks/useGetPost";
import { useState } from "react";
import useAddComment from "../hooks/useAddComment";
import useGetComments from "../hooks/useGetComments";

const Info = () => {
  const [searchParams] = useSearchParams();
  const [comment, setComment] = useState("");

  // Extract query parameters from URL
  const id = searchParams.get("id") as string;
  const type = searchParams.get("type") as string;
  const key = searchParams.get("key") as string;

  const { data, isLoading, error, isError } = useGetPost(id, type, key);
  const addComment = useAddComment();

  const getComments = useGetComments(id);

  if (isLoading) {
    return <div style={{ color: "white" }}>Loading...</div>;
  }
  if (isError) {
    return (
      <div style={{ color: "white" }}>Error: {(error as Error).message}</div>
    );
  }

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() === "") return; // Prevent submitting empty comments
    addComment.mutate(
      {
        body: comment,
        postId: +id,
      },
      {
        onSuccess: () => {
          setComment("");
        },
      }
    );
    setComment(""); // Clear the textarea after submission
  };
  return (
    <Row>
      <Col>
        <div style={{ color: "white" }}>
          <h4>
            <span style={{ color: "teal", fontWeight: "bold" }}>Title:</span>{" "}
            {data?.title}
          </h4>
          <p>
            <span style={{ color: "teal", fontWeight: "bold" }}>Status:</span>{" "}
            {data?.status}
          </p>
          <p>
            <span style={{ color: "teal", fontWeight: "bold" }}>Top Rate:</span>{" "}
            {data?.topRate ? "True" : "False"}
          </p>
          <p>
            <span style={{ color: "teal", fontWeight: "bold" }}>Body:</span>{" "}
            {data?.body}
          </p>
          <hr />
          <h4 className="mb-2">Comments:</h4>
          <Form className="mb-3" onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3">
              <Form.Control
                style={{ backgroundColor: "#333", color: "white" }}
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={addComment.isPending}
            >
              Submit
            </Button>
          </Form>

          {getComments.isLoading || getComments.isFetching
            ? //isFetching covers both loading and refetching states if data was cached
              "Loading comments..."
            : getComments.data?.map((comment) => {
                return <p key={comment.id}>{comment.body}</p>;
              })}
        </div>
      </Col>
    </Row>
  );
};

export default Info;
