import express from "express";
import { newCategory, deleteCategory, getCategories, getCategory, updateCategoryName, updateCategoryValue } from "../controllers/categorycontroller.js";

const categoryRouter = express.Router();

categoryRouter.get("/all", getCategories);
categoryRouter.get("/:id(\\d+)", getCategory);
categoryRouter.patch("/:id(\\d+)/name", updateCategoryName);
categoryRouter.patch("/:id(\\d+)/value", updateCategoryValue);
categoryRouter.delete("/:id(\\d+)", deleteCategory);
categoryRouter.post("/new", newCategory);

export { categoryRouter };