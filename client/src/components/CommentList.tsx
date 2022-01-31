import React from "react";

type Comment = {
  id: string;
  content: string;
};

type Props = {
  comments: Comment[];
};

export function CommentList({ comments }: Props): JSX.Element {
  const renderedComments = comments.map((comment: Comment): JSX.Element => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
}
