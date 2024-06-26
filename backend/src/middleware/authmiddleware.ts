import { jwtsecret } from "../common.js";
import { NextFunction, Request, Response } from "express";
import { expressjwt } from "express-jwt";

const jwtMW = expressjwt({
    //secret: Buffer.from(process.env.WEB_JWT_SECRET as string, "base64"),
    secret: jwtsecret,
    algorithms: ["HS256"]
});

function handleInvalidToken(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err.name == "UnauthorizedError") {
        res.status(401).send({
            success: false,
            error: "EXP_SESS",
            data: null
        });
    } else {
        next(err);
    }
}

export { handleInvalidToken, jwtMW };