export interface Post {
  id: string;
  title: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  status: COMMENT_STATUS;
}

export enum COMMENT_STATUS {
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
}
