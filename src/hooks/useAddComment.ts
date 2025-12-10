import axios, { AxiosError } from "axios";
import { CommentItem, CommentResponse } from "../types";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

const addComment = async (comment: CommentItem): Promise<CommentResponse> => {
  const res = await axios.post<CommentResponse>(
    `http://localhost:3009/comments`,
    comment
  );
  return res.data;
};
const useAddComment = (): UseMutationResult<
  CommentResponse,
  AxiosError,
  CommentItem
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      // Invalidate and refetch comments query to get the latest comments
      // exact: false to invalidate all comments related queries (key starts with "comments")
      queryClient.invalidateQueries({ queryKey: ["comments"], exact: false });
    },
  });
};

export default useAddComment;
