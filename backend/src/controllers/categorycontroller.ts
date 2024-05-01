import { Request, Response } from "express";
import * as categoryModel from "../models/categorymodel.js";

const NOT_IMPLEMENTED = {
    success: false,
    error: "NOT_IMPL",
    data: null
};

async function getCategories(req: Request, res: Response) {
    let data = await categoryModel.getCategory((req as any).auth.id, undefined);

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
            categories: data
        }
    });
    return;
}

async function getCategory(req: Request, res: Response) {
    let id = parseInt(req.params.id);

    if (isNaN(id) ||
        id < 0
    ) {
        res.status(400)
        .send({
            success: false,
            error: "INV_CAT",
            data: null
        });
        return;
    }

    let data = await categoryModel.getCategory((req as any).auth.id, id);

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
            error: "INV_CAT",
            data: null
        });
        return;
    }

    res.send({
        success: true,
        data: {
            category: data[0]
        }
    });
    return;
}

async function updateCategory(req: Request, res: Response) {
    res.status(503)
    .send(NOT_IMPLEMENTED);
}

async function deleteCategory(req: Request, res: Response) {
    res.status(503)
    .send(NOT_IMPLEMENTED);
}

async function newCategory(req: Request, res: Response) {
    // Verify that the category name was supplied
    if (typeof req.body.name !== "string" ||
        req.body.name.length === 0
    ) {
        res.status(400)
        .send({
            success: false,
            error: "NO_CAT_NAME",
            data: null
        });
        return;
    }

    // Validate the length
    if (req.body.name.length > 25) {
        res.status(400)
        .send({
            success: false,
            error: "INV_CAT_NAME",
            data: null
        });
        return;
    }

    let errorCode = await categoryModel.createCategory(req.body.name, (req as any).auth.id);

    if (errorCode) {
        res.status(400)
        .send({
            success: false,
            error: errorCode,
            data: {
                id: errorCode
            }
        });
        return;
    }

    res.send({
        success: true,
        data: {
            cat: req.body.name
        }
    });
    return;
}

export { getCategories, getCategory, updateCategory, deleteCategory, newCategory };