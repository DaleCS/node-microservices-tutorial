import express, { Express, Request, Response } from "express";
import cors from "cors";
import axios from "axios";

import { AppEvent, Comment } from "./types";

const app: Express = express();

app.use(express.json());
app.use(cors());

async function moderateComment(comment: Comment): Promise<void> {
  const { id, content, status } = comment;
  const regExp = /(orange)/;
  if (comment.content.search(regExp) > -1) {
    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        ...comment,
        status: "REJECTED",
      },
    } as AppEvent);
  } else {
    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        ...comment,
        status: "ACCEPTED",
      },
    } as AppEvent);
  }
}

function eventBroker(appEvent: AppEvent): void {
  const { type, data } = appEvent;
  switch (type) {
    case "CommentCreated": {
      setTimeout((): void => {
        moderateComment(data as Comment);
      }, 1000);
      break;
    }
    default: {
    }
  }
}

// @method POST /events
// @desc Receive events
// @access public
app.post("/events", async (req: Request, res: Response): Promise<void> => {
  await eventBroker(req.body as AppEvent);
  res.status(200).json({ status: "OK" });
});

const PORT = process.env.PORT ?? 4003;
app.listen(PORT, (): void => {
  console.log(`Moderation service running on port: ${PORT}`);
});
