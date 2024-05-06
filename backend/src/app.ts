import express from "express";
import cors from "cors";
import "dotenv/config";
import { authRouter } from "./routers/authrouter.js";
import { budgetRouter } from "./routers/budgetrouter.js";

const app = express();
const PORT = process.env.WEB_PORT || 3000;

let listening: boolean = false;

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

if (process.env.NODE_ENV !== "test") {
  let server = app.listen(PORT, () => {
    listening = true;
    console.log(`Running on port ${PORT}`);
  });
}

export { app };
