import { Request, Response } from "express";
import * as expenseModel from "../models/expensemodel.js"

const NOT_IMPLEMENTED = {
    success: false,
    error: "NOT_IMPL",
    data: null
};

async function getExpenses(req: Request, res: Response) {
    let data = await expenseModel.getExpenses((req as any).auth.id);

    if (typeof data === "string") {
        res.status(400)
        .send({
            success: false,
            error: data,
            data: null
        });
        return;
    }

    res.send({
        success: true,
        data: {
            expenses: data
        }
    });
    return;
}

async function getExpense(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    if (isNaN(id) ||
        id < 0
    ) {
        res.status(400)
        .send({
            success: false,
            error: "INV_EXP",
            data: null
        });
        return;
    }

    let data = await expenseModel.getExpense((req as any).auth.id, id);

    if (typeof data === "string") {
        res.status(400)
        .send({
            success: false,
            error: data,
            data: null
        });
        return;
    }

    if (data.length === 0) {
        res.status(404)
        .send({
            success: false,
            error: "INV_EXP",
            data: null
        });
        return;
    }

    res.send({
        success: true,
        data: {
            expense: data[0]
        }
    });
    return;
}

async function getExpensesByCategory(req: Request, res: Response) {
    // Validate provided category id
    let category = parseInt(req.params.id);
    if (isNaN(category) ||
        category < 0
    ) {
        res.status(400)
        .send({
            success: false,
            error: "INV_CAT",
            data: null
        });
        return;
    }

    let data = await expenseModel.getExpensesByCategory((req as any).auth.id, category);

    if (typeof data === "string") {
        res.status(400)
        .send({
            success: false,
            error: data,
            data: null
        });
        return;
    }

    res.send({
        success: true,
        data: {
            expenses: data
        }
    });
    return;
}

async function getExpensesByYear(req: Request, res: Response) {
    // Validate provided year
    let year = parseInt(req.params.year);
    if (isNaN(year) ||
        year < 0
    ) {
        res.status(400)
        .send({
            success: false,
            error: "INV_DATE",
            data: null
        });
        return;
    }

    let data = await expenseModel.getExpensesByDate((req as any).auth.id, year);

    if (typeof data === "string") {
        res.status(400)
        .send({
            success: false,
            error: data,
            data: null
        });
        return;
    }

    res.send({
        success: true,
        data: {
            expenses: data
        }
    });
    return;
}

async function getExpensesByMonth(req: Request, res: Response) {
    // Validate provided year
    let year = parseInt(req.params.year);
    if (isNaN(year) ||
        year < 0
    ) {
        res.status(400)
        .send({
            success: false,
            error: "INV_DATE",
            data: null
        });
        return;
    }

    // Validate provided month
    let month = parseInt(req.params.month);
    if (isNaN(month) ||
        month < 1 ||
        month > 12
    ) {
        res.status(400)
        .send({
            success: false,
            error: "INV_DATE",
            data: null
        });
        return;
    }

    let data = await expenseModel.getExpensesByDate((req as any).auth.id, year, month);

    if (typeof data === "string") {
        res.status(400)
        .send({
            success: false,
            error: data,
            data: null
        });
        return;
    }

    res.send({
        success: true,
        data: {
            expenses: data
        }
    });
    return;
}

async function createExpense(req: Request, res: Response) {
    // Validate provided category id
    let category = parseInt(req.body.category);
    if (isNaN(category) ||
        category < 0
    ) {
        res.status(400)
        .send({
            success: false,
            error: "INV_CAT",
            data: null
        });
        return;
    }

    // Validate provided year
    let year = parseInt(req.body.year);
    if (isNaN(year) ||
        year < 0
    ) {
        res.status(400)
        .send({
            success: false,
            error: "INV_DATE",
            data: null
        });
        return;
    }

    // Validate provided month
    let month = parseInt(req.body.month);
    if (isNaN(month) ||
        month < 1 ||
        month > 12
    ) {
        res.status(400)
        .send({
            success: false,
            error: "INV_DATE",
            data: null
        });
        return;
    }

    // Validate provided value
    let value = parseFloat(req.body.value);
    if (isNaN(value) ||
        value < 0
    ) {
        res.status(400)
        .send({
            success: false,
            error: "INV_VALUE",
            data: null
        });
        return;
    }

    let data = await expenseModel.upsertExpense(category, (req as any).auth.id, year, month, value);

    if (typeof data === "string") {
        res.status(400)
        .send({
            success: false,
            error: data,
            data: null
        });
        return;
    }

    res.send({
        success: true,
        data: {
            id: data
        }
    });
    return;
}

async function updateExpense(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    if (isNaN(id) ||
        id < 0
    ) {
        res.status(400)
        .send({
            success: false,
            error: "INV_EXP",
            data: null
        });
        return;
    }

    // Validate provided value
    let value = parseFloat(req.body.value);
    if (isNaN(value) ||
        value < 0
    ) {
        res.status(400)
        .send({
            success: false,
            error: "INV_VALUE",
            data: null
        });
        return;
    }

    let data = await expenseModel.updateValue((req as any).auth.id, id, value);

    if (typeof data === "string") {
        res.status(400)
        .send({
            success: false,
            error: data,
            data: null
        });
        return;
    }

    if (data === 0) {
        res.status(404)
        .send({
            success: false,
            error: "INV_EXP",
            data: null
        });
        return;
    }

    res.send({
        success: true,
        data: {
            category: {
                id: id,
                value: value,
                owner: (req as any).auth.id
            }
        }
    });
    return;
}

async function deleteExpense(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    if (isNaN(id) ||
        id < 0
    ) {
        res.status(400)
        .send({
            success: false,
            error: "INV_EXP",
            data: null
        });
        return;
    }

    let data = await expenseModel.deleteExpense((req as any).auth.id, id);

    if (typeof data === "string") {
        res.status(400)
        .send({
            success: false,
            error: data,
            data: null
        });
        return;
    }

    if (data === 0) {
        res.status(404)
        .send({
            success: false,
            error: "INV_EXP",
            data: null
        });
        return;
    }

    res.send({
        success: true,
        data: {
            id: id
        }
    });
    return;
}

export { getExpenses, getExpense, getExpensesByCategory, getExpensesByYear, getExpensesByMonth,
    createExpense, deleteExpense, updateExpense };
