import React, { useState } from "react";
import axios from "axios";

interface CommentCreateProps {
  postId: string;
}

interface CreateCommentRequestBody {
  content: string;
}

export function CommentCreate({ postId }: CommentCreateProps): JSX.Element {
  const [content, setContent] = useState<string>("");

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setContent(event.currentTarget.value);
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const reqBody: CreateCommentRequestBody = {
      content,
    };
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, reqBody);
    setContent("");
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input onChange={handleOnChange} className="form-control" />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
