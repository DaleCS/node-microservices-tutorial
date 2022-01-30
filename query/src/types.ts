export type Post = {
  id: string;
  title: string;
  comments: {
    id: string;
    content: string;
  }[];
};

export type PostMap = {
  [prop: string]: Post;
};

export type AppEvent = {
  type: string;
  data: any;
};
