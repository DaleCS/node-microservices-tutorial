import React from "react";

import { Comment, COMMENT_STATUS } from "./types";

type Props = {
  comments: Comment[];
};

export function CommentList({ comments }: Props): JSX.Element {
  const renderedComments = comments.map(({ id, content, status }: Comment): JSX.Element => {
    switch (status) {
      case COMMENT_STATUS.ACCEPTED: {
        return <li key={id}>{content}</li>;
      }
      case COMMENT_STATUS.REJECTED: {
        return <li key={id}>Comment removed by moderator</li>;
      }
      case COMMENT_STATUS.PENDING: {
        return <li key={id}>Comment awaiting moderation...</li>;
      }
      default: {
        return <li />;
      }
    }
  });

  return <ul>{renderedComments}</ul>;
}
