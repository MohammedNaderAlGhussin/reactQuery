import axios from "axios";
import { PostItem } from "../types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const fetchData = async (q: string): Promise<PostItem[]> => {
  const response = await axios.get(`http://localhost:3009/posts?q=${q}`);
  return response.data;
};
const useSearch = (q: string): UseQueryResult<PostItem[]> => {
  const query = useQuery({
    queryKey: ["posts", "search", { q }],
    queryFn: () => fetchData(q),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: q.length > 0,
  });
  return query;
};

export default useSearch;
