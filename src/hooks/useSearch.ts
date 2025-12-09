import axios from "axios";
import { PostItem } from "../types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const fetchData = async (q: string): Promise<PostItem[]> => {
  const trimmed = q.trim();
  if (!trimmed) return [];
  const response = await axios.get(
    `http://localhost:3009/posts?q=${encodeURIComponent(trimmed)}`
  );
  return response.data;
};
const useSearch = (q: string): UseQueryResult<PostItem[]> => {
  const trimmed = q.trim();
  const query = useQuery({
    queryKey: ["posts", "search", { q }],
    queryFn: () => fetchData(trimmed),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: trimmed.length > 0,
  });
  return query;
};

export default useSearch;
