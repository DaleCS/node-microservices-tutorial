import express, { Express, Request, Response } from "express";
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(cors());

// @method GET /posts
// @desc Query posts and their comments
// @access public
app.get("/posts", async (req: Request, res: Response): Promise<void> => {});

// @method POST /events
// @desc Receive events
// @access public
app.post("/events", async (req: Request, res: Response): Promise<void> => {});

const PORT = process.env.PORT ?? 4002;
app.listen(PORT, (): void => {
  console.log(`Query service running on port: ${PORT}`);
});
