import axios from "axios";
import { PostItem } from "../types";
import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

export const fetchData = async (id: string): Promise<PostItem> => {
  const response = await axios.get<PostItem>(
    `http://localhost:3009/posts/${id}`
  );
  return response.data;
};

const useGetPost = (
  id: string,
  paramType: string,
  paramKey: string
): UseQueryResult<PostItem> => {
  const queryClient = useQueryClient();

  let getCachedData: PostItem[] | undefined;

  if (paramType === "paginate") {
    // retrieve cached data from paginated posts
    getCachedData = queryClient.getQueryData<PostItem[]>([
      "posts",
      { selectedStatus: "all", paginate: +paramKey },
    ]);
  } else {
    // retrieve cached data from searched posts
    getCachedData = queryClient.getQueryData<PostItem[]>([
      "posts",
      "search",
      { q: paramKey },
    ]);
  }

  const query = useQuery({
    queryKey: ["post", { id: +id }],
    queryFn: () => fetchData(id),
    // Provide initial data from cached posts if available and avoid refetching (calling API) immediately
    initialData: () => {
      if (!getCachedData) return undefined;
      return getCachedData?.find((post) => post.id === +id);
    },
  });
  return query;
};

export default useGetPost;
