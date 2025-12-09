import { Row, Col } from "react-bootstrap";
import PostList from "../components/PostList";
import PostFilter from "../components/PostFilter";
import { useState } from "react";
import { PostStatusType } from "../types";
import SearchQuery from "../components/SearchQuery";

const Home = () => {
  const [selectedStatus, setSelectedStatus] = useState<PostStatusType>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <Row>
      <Col xs={9}>
        <PostList selectedStatus={selectedStatus} searchQuery={searchQuery} />
      </Col>
      <Col>
        <SearchQuery setSearchQuery={setSearchQuery} />
        {searchQuery.length === 0 && (
          <PostFilter
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
        )}
      </Col>
    </Row>
  );
};

export default Home;
