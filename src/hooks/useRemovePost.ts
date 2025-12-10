import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deletePost = async (postId: number) => {
  await axios.delete(`http://localhost:3009/posts/${postId}`);
};

const useRemovePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      // Invalidate and refetch posts query to get the latest posts
      queryClient.invalidateQueries({ queryKey: ["posts"], exact: false });
    },
  });
};

export default useRemovePost;
