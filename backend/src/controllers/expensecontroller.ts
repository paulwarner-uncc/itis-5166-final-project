import { Request, Response } from "express";
import * as expenseModel from "../models/expensemodel.js"

const NOT_IMPLEMENTED = {
    success: false,
    error: "NOT_IMPL",
    data: null
};

// async function getCategories(req: Request, res: Response) {
async function getExpenses(req: Request, res: Response) {
    res.status(500)
    .send(NOT_IMPLEMENTED);
}

async function getExpense(req: Request, res: Response) {
    res.status(500)
    .send(NOT_IMPLEMENTED);
}

async function getExpensesByYear(req: Request, res: Response) {
    res.status(500)
    .send(NOT_IMPLEMENTED);
}

async function getExpensesByMonth(req: Request, res: Response) {
    res.status(500)
    .send(NOT_IMPLEMENTED);
}

async function updateExpense(req: Request, res: Response) {
    res.status(500)
    .send(NOT_IMPLEMENTED);
}

async function deleteExpense(req: Request, res: Response) {
    res.status(500)
    .send(NOT_IMPLEMENTED);
}

async function createExpense(req: Request, res: Response) {
    res.status(500)
    .send(NOT_IMPLEMENTED);
}

export { getExpenses, getExpense, getExpensesByYear, getExpensesByMonth, updateExpense,
    deleteExpense, createExpense };
