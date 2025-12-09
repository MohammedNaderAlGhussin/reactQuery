import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { PostItem, PostStatusType } from "../types";

export const fetchPosts = async (
  selectedStatus: PostStatusType,
  paginate: number
): Promise<PostItem[]> => {
  if (selectedStatus === "all") {
    const res = await axios.get<PostItem[]>(
      `http://localhost:3009/posts?_page=${paginate}&_limit=5`
    );
    return res.data;
  } else {
    const res = await axios.get<PostItem[]>(
      `http://localhost:3009/posts?status=${selectedStatus}`
    );
    return res.data;
  }
};

const useGetPosts = (
  selectedStatus: PostStatusType,
  paginate: number
): UseQueryResult<PostItem[]> => {
  const query = useQuery({
    queryKey: ["posts", { selectedStatus, paginate }],
    queryFn: () => fetchPosts(selectedStatus, paginate),
    staleTime: 1000 * 10, // 10 seconds
    refetchInterval: 1000 * 15, // 15 seconds refetching data automatically after stale time (10 seconds)
  });
  return query;
};

export default useGetPosts;
