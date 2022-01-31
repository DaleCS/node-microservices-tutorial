import express, { Express, Request, Response } from "express";
import cors from "cors";
import { randomBytes } from "crypto";

import { CommentsRequestBody, CommentsByPostMap, Comment, AppEvent } from "./types";
import axios from "axios";

const app: Express = express();

app.use(express.json());
app.use(cors());

async function eventBroker({ type, data }: AppEvent): Promise<void> {
  switch (type) {
    case "CommentModerated": {
      console.log("Received 'CommentModerated' event");
      const comments = commentsByPostId[data.postId] ?? [];
      const commentIndex = comments.findIndex((comment: Comment) => comment.id === data.id);
      if (commentIndex > -1) {
        comments[commentIndex] = data;
      } else {
        comments.push(data);
      }
      commentsByPostId[data.postId] = comments;
      await axios.post("http://localhost:4005/events", {
        type: "CommentUpdated",
        data,
      } as AppEvent);
      break;
    }
    default: {
    }
  }
}

const commentsByPostId: CommentsByPostMap = {};

// @method GET /posts/:id/comments
// @desc Get comments for a particular post
// @access public
app.get("/posts/:id/comments", async (req: Request, res: Response): Promise<void> => {
  res.status(200).json(commentsByPostId[req.params.id] ?? []);
});

// @method POST /posts/:id/comments
// @desc Add a new comment to a post
// @access public
app.post("/posts/:id/comments", async (req: Request, res: Response): Promise<void> => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body as CommentsRequestBody;

  const comments: Comment[] = commentsByPostId[req.params.id] ?? [];
  const newComment: Comment = {
    id: commentId,
    content,
    status: "PENDING",
  };
  comments.push(newComment);

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      ...newComment,
      postId: req.params.id,
    } as Comment,
  } as AppEvent);

  commentsByPostId[req.params.id] = comments;
  res.status(201).json(comments);
});

// @method POST /events
// @desc Receive events
// @access public
app.post("/events", async (req: Request, res: Response): Promise<void> => {
  eventBroker(req.body as AppEvent);
  res.status(200).json();
});

const PORT = process.env.PORT ?? 4001;
app.listen(PORT, (): void => {
  console.log(`Comments service is listening to port: ${PORT}`);
});
