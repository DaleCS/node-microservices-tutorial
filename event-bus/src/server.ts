import express, { Express, Request, Response } from "express";
import cors from "cors";
import axios from "axios";

import { AppEvent } from "./types";

const app: Express = express();

app.use(express.json());
app.use(cors());

// @method POST /events
// @desc Emit events to all listener services
// @access publics
app.post("/events", async (req: Request, res: Response): Promise<void> => {
  console.log("Received event", req.body);
  const event: AppEvent = req.body;

  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:4001/events", event);
  axios.post("http://localhost:4002/events", event);

  res.status(200).json({ status: "OK" });
});

const PORT = process.env.PORT ?? 4005;
app.listen(PORT, (): void => {
  console.log(`EventBus service running on port: ${PORT}`);
});
