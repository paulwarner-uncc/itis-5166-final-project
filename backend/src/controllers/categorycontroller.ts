import { Request, Response } from "express";
import * as categoryModel from "../models/categorymodel.js";

async function getCategories(req: Request, res: Response) {
    let data = await categoryModel.getCategory((req as any).auth.id);

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
    // Parse the ID to make sure it passes a sanity test
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

async function updateCategoryName(req: Request, res: Response) {
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

    // Parse the ID to make sure it passes a sanity test
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

    let data = await categoryModel.updateCategoryName((req as any).auth.id, id, req.body.name);

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
            error: "INV_CAT",
            data: null
        });
        return;
    }

    res.send({
        success: true,
        data: {
            category: {
                name: req.body.name
            }
        }
    });
    return;
}

async function updateCategoryValue(req: Request, res: Response) {
    // Verify that the category value was supplied
    let value = parseFloat(req.body.value);
    if (isNaN(value) ||
        value < 0
    ) {
        res.status(400)
        .send({
            success: false,
            error: "NO_CAT_VALUE",
            data: null
        });
        return;
    }

    // Parse the ID to make sure it passes a sanity test
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

    let data = await categoryModel.updateCategoryValue((req as any).auth.id, id, value);

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
            error: "INV_CAT",
            data: null
        });
        return;
    }

    res.send({
        success: true,
        data: {
            category: {
                value: value
            }
        }
    });
    return;
}

async function deleteCategory(req: Request, res: Response) {
    // Parse the ID to make sure it passes a sanity test
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

    let data = await categoryModel.deleteCategory((req as any).auth.id, id);

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
            error: "INV_CAT",
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

    // Verify that the category value was supplied
    let value = parseFloat(req.body.value);
    if (isNaN(value) ||
        value < 0
    ) {
        res.status(400)
        .send({
            success: false,
            error: "NO_CAT_VALUE",
            data: null
        });
        return;
    }

    let data = await categoryModel.createCategory(req.body.name, (req as any).auth.id, value);

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
            id: data,
            name: req.body.name,
            value: value,
            owner: (req as any).auth.id
        }
    });
    return;
}

export { getCategories, getCategory, updateCategoryName, updateCategoryValue, deleteCategory,
    newCategory };