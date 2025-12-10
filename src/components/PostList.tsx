import { Button, ButtonGroup, Table } from "react-bootstrap";
import useGetPosts, { fetchPosts } from "../hooks/useGetPosts";
import Post from "./Post";
import { PostStatusType } from "../types";
import useSearch from "../hooks/useSearch";
import { useEffect, useState } from "react";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";

interface PostListProps {
  selectedStatus: PostStatusType;
  searchQuery: string;
}
const PostList = ({ selectedStatus, searchQuery }: PostListProps) => {
  const [paginate, setPaginate] = useState<number>(1);
  const { isError, error, data, isStale, refetch } = useGetPosts(
    selectedStatus,
    paginate
  );
  const searchData = useSearch(searchQuery);
  const queryClient = useQueryClient();
  const globalLoading = useIsFetching();

  // Applying Prefetching technique
  useEffect(() => {
    const nextPage = paginate + 1;
    if (nextPage > 3) return;
    queryClient.prefetchQuery({
      queryKey: ["posts", { selectedStatus, paginate: nextPage }],
      queryFn: () => fetchPosts(selectedStatus, nextPage),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginate, queryClient]);

  if (globalLoading) {
    return <div style={{ color: "white" }}>Loading...</div>;
  }

  if (isError) {
    return (
      <div style={{ color: "white" }}>Error: {(error as Error).message}</div>
    );
  }

  if (searchData.isError) {
    return (
      <div style={{ color: "white" }}>
        Error: {(searchData.error as Error).message}
      </div>
    );
  }

  const postList =
    searchQuery.length > 0 ? (
      searchData.data?.map((post, index) => (
        <Post
          key={post.id}
          post={post}
          index={index}
          //passing type and searchQuery for constructing Link URL in Post component
          type="search"
          searchQuery={searchQuery}
          selectedStatus={selectedStatus}
        />
      ))
    ) : searchQuery.length === 0 ? (
      data?.map((post, index) => (
        <Post
          key={post.id}
          post={post}
          index={index}
          //passing type and paginate for constructing Link URL in Post component
          type="paginate"
          paginate={paginate}
          selectedStatus={selectedStatus}
        />
      ))
    ) : (
      <></>
    );

  return (
    <>
      {/* creating a button to refetch/update data after stale time (10s) */}
      {isStale && searchQuery.length === 0 && (
        <button
          className="bg-primary btn"
          style={{ color: "white", marginBottom: "10px" }}
          onClick={() => refetch()}
        >
          Update Data..
        </button>
      )}
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
      {searchQuery.length === 0 && selectedStatus === "all" && (
        <ButtonGroup aria-label="Basic example">
          <Button variant="light" onClick={() => setPaginate(1)}>
            1
          </Button>
          <Button variant="light" onClick={() => setPaginate(2)}>
            2
          </Button>
          <Button variant="light" onClick={() => setPaginate(3)}>
            3
          </Button>
        </ButtonGroup>
      )}
    </>
  );
};

export default PostList;
