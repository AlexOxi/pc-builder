import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express, { Request, Response, NextFunction } from "express";
import { initRoutes } from "./routes";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["*"];

app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes("*") || (origin && allowedOrigins.includes(origin))) {
    res.header("Access-Control-Allow-Origin", origin || "*");
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

initRoutes(app);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});