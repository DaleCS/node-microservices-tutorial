export interface CommentsRequestBody {
  content: string;
}

export interface CommentsByPostMap {
  [prop: string]: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  status: "ACCEPTED" | "PENDING" | "REJECTED";
}

export type AppEvent = {
  type: string;
  data: any;
};
