import axios from "axios";
import { CommentResponse } from "../types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const fetchComments = async (post_id: string): Promise<CommentResponse[]> => {
  const res = await axios.get<CommentResponse[]>(
    `http://localhost:3009/comments?post_id=${post_id}&_sort=id&_order=desc`
  );
  return res.data;
};

const useGetComments = (post_id: string): UseQueryResult<CommentResponse[]> => {
  const query = useQuery({
    queryKey: ["comments", { post_id: +post_id }],
    queryFn: () => fetchComments(post_id),
  });
  return query;
};

export default useGetComments;
