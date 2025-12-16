import express from "express";
import { initRoutes } from "./routes";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());

// Simple CORS so the frontend (e.g., Vite on 5173) can call this API.
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

initRoutes(app);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});