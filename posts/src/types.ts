export interface PostsRequestBody {
  title: string;
}

export interface PostMap {
  [prop: string]: Post;
}

export interface Post {
  id: string;
  title: string;
}

export type AppEvent = {
  type: string;
  data: any;
};
