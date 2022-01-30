import express, { Express, Request, Response } from "express";
import cors from "cors";
import { randomBytes } from "crypto";

import { PostsRequestBody, PostMap, Post, AppEvent } from "./types";
import axios from "axios";

const app: Express = express();

app.use(express.json());
app.use(cors());

const posts: PostMap = {};

// @method GET /posts
// @desc Get all posts
// @access public
app.get("/posts", async (req: Request, res: Response): Promise<void> => {
  console.log("GET /posts");
  res.status(200).json(posts);
});

// @method POST /posts
// @desc Add a new post
// @access public
app.post("/posts", async (req: Request, res: Response): Promise<void> => {
  console.log("POST /posts");
  const id: string = randomBytes(4).toString("hex");
  const { title } = req.body as PostsRequestBody;
  posts[id] = {
    id,
    title,
  } as Post;

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  } as AppEvent);

  res.status(201).json(posts[id]);
});

// @method POST /events
// @desc Receive events
// @access public
app.post("/events", async (req: Request, res: Response): Promise<void> => {
  console.log("Received event", req.body.type);
  res.status(200).json();
});

const PORT = process.env.PORT ?? 4000;
app.listen(PORT, (): void => {
  console.log(`Posts service is listening to port: ${PORT}`);
});
