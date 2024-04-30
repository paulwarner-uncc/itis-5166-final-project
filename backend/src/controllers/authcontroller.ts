import { Request, Response } from "express";
import argon2 from "argon2";
import "dotenv/config";
import { createUser, getUser } from "../models/authmodel.js";
import jwt from "jsonwebtoken";

// TODO: add client-side code to translate error messages into human readable messages
async function loginRequest(req: Request, res: Response) {

    // Verify that the username and password are present and are strings
    if (typeof req.body.username !== "string" ||
        typeof req.body.password !== "string" ||
        req.body.username.length === 0 ||
        req.body.password.length === 0) {
        res.status(400).send({
            success: false,
            error: "NO_CREDS",
            data: null
        });
        return;
    }

    // Retrieve the user from the database, if one exists
    let user = await getUser(req.body.username);

    // If user is a string, then an error code was returned
    if (typeof user === "string") {
        res.status(401).send({
            success: false,
            error: user,
            data: null
        });
        return;
    }

    // Verify that the provided password matches the given hash
    if (!await argon2.verify(user.password, req.body.password)) {
        res.status(401).send({
            success: false,
            error: "ER_NO_USER",
            data: null
        });
        return;
    }

    // Issue a JWT token
    let token = signJwt({
        id: user.id,
        username: user.username
    });

    res.send({
        success: true,
        data: {
            jwt: token
        }
    });
    return;
};

async function signupRequest(req: Request, res: Response) {
    // Verify that the username and password are present and are strings
    if (typeof req.body.username !== "string" ||
        typeof req.body.password !== "string" ||
        req.body.username.length === 0 ||
        req.body.password.length === 0) {

        res.status(400);
        res.send({
            success: false,
            error: "NO_CREDS",
            data: null
        });
        return;
    }

    // Verify that the username isn't too long
    if (req.body.username.length > 25) {
        res.status(400);
        res.send({
            success: false,
            error: "INV_USERNAME",
            data: null
        });
        return;
    }

    // TODO: password requirements

    // Hash the password
    let hash = await argon2.hash(req.body.password);
    let errorCode = await createUser(req.body.username, hash);

    // errorCode is a string if an error and null otherwise, so use truthy value
    if (errorCode) {
        res.status(401);
        res.send({
            success: false,
            error: errorCode,
            data: null
        });
        return;
    }

    res.send({
        success: true,
        data: {
            username: req.body.username
        }
    });
    return;
}

async function refreshToken(req: Request, res: Response) {
    // NOTE: this function should require authorization
    // IF IT DOES NOT, THIS COULD ALLOW AN ATTACKER TO COMPLETELY BYPASS AUTHENTICATION

    // Remove the "iat" and "exp" keys to allow for resigning
    let token = (req as any).auth;
    delete token["iat"];
    delete token["exp"];

    // Resign the token with a new duration of 60 seconds
    let newToken = signJwt(token);

    res.send({
        success: true,
        data: {
            jwt: newToken
        }
    });
}

// Ensure all tokens are signed the same way
function signJwt(content: object): string {
    return jwt.sign(content, Buffer.from(process.env.WEB_JWT_SECRET as string, "base64"), {
        expiresIn: 60
    });;
}

export { loginRequest, signupRequest, refreshToken };