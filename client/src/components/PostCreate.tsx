import React, { useState } from "react";
import axios from "axios";

type CreatePostRequestBody = {
  title: string;
};

export function PostCreate() {
  const [title, setTitle] = useState<string>("");

  const handleOnChange = async (event: React.FormEvent<HTMLInputElement>): Promise<void> => {
    event.preventDefault();
    setTitle(event.currentTarget.value);
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const reqBody = {
      title,
    } as CreatePostRequestBody;
    await axios.post("http://localhost:4000/posts", reqBody);
    setTitle("");
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input value={title} onChange={handleOnChange} className="form-control" />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
