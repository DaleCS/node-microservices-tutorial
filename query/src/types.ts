export type Post = {
  id: string;
  title: string;
  comments: Comment[];
};

export type Comment = {
  id: string;
  content: string;
  status: "ACCEPTED" | "PENDING" | "REJECTED";
};

export type PostMap = {
  [prop: string]: Post;
};

export type AppEvent = {
  type: string;
  data: any;
};
