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
  post_id: number;
  body: string;
}
export interface CommentResponse {
  id: number;
  post_id: number;
  body: string;
}
