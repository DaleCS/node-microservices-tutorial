import React, { useState, useEffect } from "react";
import axios from "axios";

import { CommentCreate } from "./CommentCreate";
import { CommentList } from "./CommentList";

type PostMap = {
  [prop: string]: Post;
};

type Post = {
  id: string;
  title: string;
};

export function PostList() {
  const [posts, setPosts] = useState<PostMap>({});

  const fetchPosts = async (): Promise<void> => {
    const res = await axios.get("http://localhost:4000/posts/");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post: Post): JSX.Element => {
    return (
      <div className="card" style={{ width: "30%", marginBottom: "20px" }} key={post.id}>
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList postId={post.id} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return <div className="d-flex flex-row flex-wrap justify-content-between">{renderedPosts}</div>;
}
