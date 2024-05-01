import { newCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/categorycontroller.js";
import express from "express";

const categoryRouter = express.Router();

categoryRouter.get("/all", getCategories);
categoryRouter.get("/:id(\\d+)", getCategory);
categoryRouter.patch("/:id(\\d+)", updateCategory);
categoryRouter.delete("/:id(\\d+)", deleteCategory);
categoryRouter.post("/new", newCategory);

export { categoryRouter };