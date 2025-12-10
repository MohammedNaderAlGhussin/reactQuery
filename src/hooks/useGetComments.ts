import axios from "axios";
import { CommentResponse } from "../types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const fetchComments = async (postId: string): Promise<CommentResponse[]> => {
  const res = await axios.get<CommentResponse[]>(
    `http://localhost:3009/comments?post_id=${postId}&_sort=id&_order=desc`
  );
  return res.data;
};

const useGetComments = (postId: string): UseQueryResult<CommentResponse[]> => {
  const query = useQuery({
    queryKey: ["comments", { postId: +postId }],
    queryFn: () => fetchComments(postId),
  });
  return query;
};

export default useGetComments;
