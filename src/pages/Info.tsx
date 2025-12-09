import { Col, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import useGetPost from "../hooks/useGetPost";

const Info = () => {
  const [searchParams] = useSearchParams();

  // Extract query parameters from URL
  const id = searchParams.get("id") as string;
  const type = searchParams.get("type") as string;
  const key = searchParams.get("key") as string;

  const { data, isLoading, error, isError } = useGetPost(id, type, key);
  if (isLoading) {
    return <div style={{ color: "white" }}>Loading...</div>;
  }
  if (isError) {
    return (
      <div style={{ color: "white" }}>Error: {(error as Error).message}</div>
    );
  }
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
            {data?.topRate}
          </p>
          <p>
            <span style={{ color: "teal", fontWeight: "bold" }}>Body:</span>{" "}
            {data?.body}
          </p>
          <hr />
          <h4 className="mb-2">Comments:</h4>
          <p>Comment 1</p>
          <p>Comment 2</p>
        </div>
      </Col>
    </Row>
  );
};

export default Info;
