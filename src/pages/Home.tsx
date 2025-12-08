import { Row, Col, Form } from "react-bootstrap";
import PostList from "../components/PostList";

const Home = () => {
  return (
    <Row>
      <Col xs={9}>
        <PostList />
      </Col>
      <Col>
        <h5 style={{ color: "white" }}>Filter By Status</h5>
        <Form.Select>
          <option value="">Select Status</option>
          <option value="Publish">Publish</option>
          <option value="Draft">Draft</option>
          <option value="Blocked">Blocked</option>
        </Form.Select>
      </Col>
    </Row>
  );
};

export default Home;
