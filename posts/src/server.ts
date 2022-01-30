import express, { Express, Request, Response } from "express";
import cors from "cors";
import { randomBytes } from "crypto";

import { PostsRequestBody, PostMap, Post } from "./types";

const app: Express = express();

app.use(express.json());
app.use(cors());

const posts: PostMap = {};

// @method GET /posts
// @description Get all posts
// @access public
app.get("/posts", async (req: Request, res: Response): Promise<void> => {
  console.log("GET /posts");
  res.status(200).json(posts);
});

// @method POST /posts
// @description Add a new post
// @access public
app.post("/posts", async (req: Request, res: Response): Promise<void> => {
  console.log("POST /posts");
  const id: string = randomBytes(4).toString("hex");
  const { title } = req.body as PostsRequestBody;
  posts[id] = {
    id,
    title,
  } as Post;
  res.status(201).json(posts[id]);
});

const PORT = process.env.PORT ?? 4000;
app.listen(PORT, (): void => {
  console.log(`Posts service is listening to port: ${PORT}`);
});
