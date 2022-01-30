import express, { Express, Request, Response } from "express";
import cors from "cors";
import { randomBytes } from "crypto";

import { CommentsRequestBody, CommentsByPostMap, Comment } from "./types";

const app: Express = express();

app.use(express.json());
app.use(cors());

const commentsByPostId: CommentsByPostMap = {};

// @method GET /posts/:id/comments
// @desc Get comments for a particular post
// @access public
app.get("/posts/:id/comments", async (req: Request, res: Response): Promise<void> => {
  console.log("GET /posts/:id/comments");
  res.status(200).json(commentsByPostId[req.params.id] ?? []);
});

// @method POST /posts/:id/comments
// @desc Add a new comment to a post
// @access public
app.post("/posts/:id/comments", async (req: Request, res: Response): Promise<void> => {
  console.log("POST /posts/:id/comments");
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body as CommentsRequestBody;
  const comments: Comment[] = commentsByPostId[req.params.id] ?? [];
  comments.push({ id: commentId, content } as Comment);
  commentsByPostId[req.params.id] = comments;
  res.status(201).json(comments);
});

const PORT = process.env.PORT ?? 4001;
app.listen(PORT, (): void => {
  console.log(`Comments service is listening to port: ${PORT}`);
});
