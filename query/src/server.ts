import express, { Express, Request, Response } from "express";
import cors from "cors";

import { PostMap, Post, AppEvent } from "./types";

const app: Express = express();

app.use(express.json());
app.use(cors());

const posts: PostMap = {};

function brokerEvent({ type, data }: AppEvent): void {
  switch (type) {
    case "PostCreated": {
      const { id, title } = data;
      posts[id] = { id, title, comments: [] } as Post;
      break;
    }
    case "CommentCreated": {
      const { id, content, postId } = data;
      const post = posts[postId];
      post.comments.push({ id, content });
      break;
    }
    default: {
      console.log("Unknown event; Ignoring...");
    }
  }
}

// @method GET /posts
// @desc Query posts and their comments
// @access public
app.get("/posts", async (req: Request, res: Response): Promise<void> => {
  console.log("GET /posts");
  res.status(200).json(posts);
});

// @method POST /events
// @desc Receive events
// @access public
app.post("/events", async (req: Request, res: Response): Promise<void> => {
  console.log("Event received", (req.body as AppEvent).type);
  const event: AppEvent = req.body;
  brokerEvent(event);
  res.status(200).json();
});

const PORT = process.env.PORT ?? 4002;
app.listen(PORT, (): void => {
  console.log(`Query service running on port: ${PORT}`);
});
