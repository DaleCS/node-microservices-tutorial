import express, { Express, Request, Response } from "express";
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT ?? 4002;
app.listen(PORT, (): void => {
  console.log(`Query service running on port: ${PORT}`);
});
