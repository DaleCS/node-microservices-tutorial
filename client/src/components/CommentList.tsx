import React, { useState, useEffect } from "react";
import axios from "axios";
import { render } from "react-dom";

type Comment = {
  id: string;
  content: string;
};

type Props = {
  postId: string;
};

export function CommentList({ postId }: Props): JSX.Element {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async (): Promise<void> => {
    const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
    setComments(res.data as Comment[]);
  };

  useEffect((): void => {
    fetchComments();
  }, []);

  const renderedComments = comments.map((comment: Comment): JSX.Element => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
}
