import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export interface DataItem {
  id: number;
  title: string;
  body: string;
  topRate: boolean;
  status: "publish" | "draft" | "blocked";
}
const fetchPosts = async (): Promise<DataItem[]> => {
  const res = await axios.get<DataItem[]>("http://localhost:3009/posts");
  return res.data;
};

const useGetPosts = (): UseQueryResult<DataItem[]> => {
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  return query;
};

export default useGetPosts;
