export interface PostItem {
  id: number;
  title: string;
  body: string;
  topRate: boolean;
  status: PostItemStatusType;
}

export type PostStatusType = "published" | "draft" | "block" | "all";
export type PostItemStatusType = Exclude<PostStatusType, "all">;

export interface CommentItem {
  postId: number;
  body: string;
}
export interface CommentResponse {
  id: number;
  postId: number;
  body: string;
}
