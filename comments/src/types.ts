export interface CommentsRequestBody {
  content: string;
}

export interface CommentsByPostMap {
  [prop: string]: Comment[];
}

export interface Comment {
  id: string;
  content: string;
}
