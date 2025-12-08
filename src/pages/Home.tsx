import { Row, Col } from "react-bootstrap";
import PostList from "../components/PostList";
import PostFilter from "../components/PostFilter";
import { useState } from "react";
import { PostStatusType } from "../types";

const Home = () => {
  const [selectedStatus, setSelectedStatus] = useState<PostStatusType>("all");
  console.log(selectedStatus);
  return (
    <Row>
      <Col xs={9}>
        <PostList selectedStatus={selectedStatus} />
      </Col>
      <Col>
        <PostFilter
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
      </Col>
    </Row>
  );
};

export default Home;
