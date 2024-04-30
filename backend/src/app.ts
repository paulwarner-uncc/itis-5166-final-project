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

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
