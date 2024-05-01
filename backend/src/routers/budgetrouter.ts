import express from "express";
import { handleInvalidToken, jwtMW } from "../middleware/authmiddleware.js";
import { categoryRouter } from "./categoryrouter.js";

const budgetRouter = express.Router();

budgetRouter.use(jwtMW);
budgetRouter.use(handleInvalidToken);

budgetRouter.use("/category", categoryRouter);

budgetRouter.post("/test", (req, res) => {
    res.send("OK");
});

export { budgetRouter };