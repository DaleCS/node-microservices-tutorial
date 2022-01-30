import express, { Express } from "express";
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, (): void => {
  console.log(`Posts service is listening to port: ${PORT}`);
});
