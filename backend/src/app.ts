// TODO: supply example .env file in README.md

import express from "express";
import cors from "cors";
import "dotenv/config";
import { authRouter } from "./routers/authrouter.js";
import { budgetRouter } from "./routers/budgetrouter.js";

const app = express();
const PORT = process.env.WEB_PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/budget", budgetRouter);

// 404 page
app.use((req, res) => {
  res.status(404)
  .send({
    success: false,
    error: "BAD_PAGE",
    data: null
  });
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
