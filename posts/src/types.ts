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
