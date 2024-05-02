import express from "express";
import { handleInvalidToken, jwtMW } from "../middleware/authmiddleware.js";
import { categoryRouter } from "./categoryrouter.js";
import { expenseRouter } from "./expenserouter.js";

const budgetRouter = express.Router();

budgetRouter.use(jwtMW);
budgetRouter.use(handleInvalidToken);

budgetRouter.use("/category", categoryRouter);
budgetRouter.use("/expense", expenseRouter);

export { budgetRouter };