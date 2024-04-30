import express from "express";
import { handleInvalidToken, jwtMW } from "../middleware/authmiddleware.js";

const budgetRouter = express.Router();

budgetRouter.use(jwtMW);
budgetRouter.use(handleInvalidToken);

budgetRouter.post("/test", (req, res) => {
    res.send("OK");
});

export { budgetRouter };