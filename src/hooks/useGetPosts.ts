import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { PostItem, PostStatusType } from "../types";

const fetchPosts = async (
  selectedStatus: PostStatusType
): Promise<PostItem[]> => {
  if (selectedStatus === "all") {
    const res = await axios.get<PostItem[]>("http://localhost:3009/posts");
    return res.data;
  } else {
    const res = await axios.get<PostItem[]>(
      `http://localhost:3009/posts?status=${selectedStatus}`
    );
    return res.data;
  }
};

const useGetPosts = (
  selectedStatus: PostStatusType
): UseQueryResult<PostItem[]> => {
  const query = useQuery({
    queryKey: ["posts", { selectedStatus }],
    queryFn: () => fetchPosts(selectedStatus),
    staleTime: 1000 * 10, // 10 seconds
  });
  return query;
};

export default useGetPosts;
