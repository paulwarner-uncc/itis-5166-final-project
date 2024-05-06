import axios, { AxiosResponse } from "axios";
import { jwtsecret } from "../common.js";
import "dotenv/config";
import jwt from "jsonwebtoken";

function getHeaders() {
    const token = jwt.sign({
        "id": 1,
        "username": "a"
    //}, Buffer.from(process.env.WEB_JWT_SECRET as string, "base64"), {
    }, jwtsecret, {
        expiresIn: 60
    });
    return {
        Authorization: `Bearer ${token}`
    };
}

async function getReq(url: string): Promise<AxiosResponse<any, any>> {
    try {
        return await axios.get(url, {
            headers: getHeaders()
        });
    } catch (err) {
        return (err as any).response;
    }
}

async function postReq(url: string, body: object): Promise<AxiosResponse<any, any>> {
    try {
        return await axios.post(url, body, {
            headers: getHeaders()
        });
    } catch (err) {
        return (err as any).response;
    }
}

async function patchReq(url: string, body: object): Promise<AxiosResponse<any, any>> {
    try {
        return await axios.patch(url, body, {
            headers: getHeaders()
        });
    } catch (err) {
        return (err as any).response;
    }
}

async function deleteReq(url: string) {
    try {
        return await axios.delete(url, {
            headers: getHeaders()
        });
    } catch (err) {
        return (err as any).response;
    }
}

// Have one always pass test to prevent errors in this file when testing
test("Always pass", () => {
    expect(true).toBe(true);
});

export { getReq, postReq, patchReq, deleteReq };