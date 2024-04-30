import express from "express";
import { loginRequest, refreshToken, signupRequest } from "../controllers/authcontroller.js";
import { handleInvalidToken, jwtMW } from "../middleware/authmiddleware.js";

// All requests use post because sensitive information is sent in each
// Better not to risk it getting saved in the browser's history
const authRouter = express.Router();

authRouter.post("/login", loginRequest);
authRouter.post("/signup", signupRequest);

// Require a valid session to refresh a token
authRouter.post("/refresh", jwtMW, handleInvalidToken, refreshToken);

export { authRouter };