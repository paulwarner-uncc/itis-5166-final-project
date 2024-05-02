import express from "express";
import { createExpense, deleteExpense, getExpense, getExpenses, getExpensesByMonth, getExpensesByYear, updateExpense } from "../controllers/expensecontroller.js";

const expenseRouter = express.Router();

expenseRouter.get("/all", getExpenses);
expenseRouter.get("/date/:year(\\d+)/all", getExpensesByYear);
expenseRouter.get("/data/:year(\\d+)/:month(\\d+)/all", getExpensesByMonth);
expenseRouter.get(":id(\\d+)", getExpense);
expenseRouter.patch(":id(\\d+)", updateExpense);
expenseRouter.delete(":id(\\d+)", deleteExpense);
expenseRouter.post("/new", createExpense);

export { expenseRouter };