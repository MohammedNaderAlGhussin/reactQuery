import axios, { AxiosError } from "axios";
import { CommentItem, CommentResponse } from "../types";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

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
  return useMutation({
    mutationFn: addComment,
    onSuccess: (data) => {
      console.log("Comment added successfully:", data);
    },
  });
};

export default useAddComment;
