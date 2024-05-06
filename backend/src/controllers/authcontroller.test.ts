import axios from "axios";
import "dotenv/config";
import jsonwebtoken from "jsonwebtoken";
import { app } from "../app.js";
import { fail } from "assert";
import { jwtsecret } from "../common.js";

let testingServer: any;

beforeAll(async () => {
    testingServer = app.listen(3000);

    await new Promise((resolve) => {
        (testingServer as any).addListener("listening", () => {
            resolve(undefined);
        });
    });
});

afterAll(async () => {
    testingServer.close();
});

test("connectivity-test", async () => {
    // Verify that the server can be reached
    let resp;
    try {
        resp = await axios.get("http://localhost:3000/");
    } catch (err) {
        resp = (err as any).response;
    }
    expect(resp.data).toBeTruthy();
});

describe("POST /api/auth/login, fake", () => {
    it("Log in with fake login", async () => {
        try {
            await axios.post("http://localhost:3000/api/auth/login", {
                username: "aaaaaaaaaaaaaaaaaaaaaaaaa",
                password: "wrong"
            });
            fail();
        } catch (err) {
            expect((err as any).response.status).toBe(401);
        }
    });
});

describe("POST /api/auth/signup", () => {
    let username = Math.random().toString().substring(2); // Generate a random username

    it("Sign up with new account", async () => {
        try {
            await axios.post("http://localhost:3000/api/auth/signup", {
                username: username,
                password: "password"
            });
        } catch (err) {
            // Non-200 status code, fail
            fail();
        }
    });

    it("Log in with new account", async () => {
        // Stall for a bit to make sure the account is generated
        /* await new Promise((resolve) => setTimeout(() => resolve(undefined), 1000)); */

        try {
            let resp = await axios.post("http://localhost:3000/api/auth/login", {
                username: username,
                password: "password"
            });
            expect(typeof resp.data).toBe("object");
            expect(resp.data.success).toBe(true);

            /* let token = jsonwebtoken.verify(resp.data.data.jwt,
                Buffer.from(process.env.WEB_JWT_SECRET as string, "base64")); */
            let token = jsonwebtoken.verify(resp.data.data.jwt, jwtsecret);
            expect(typeof token).toBe("object");
            expect((token as any).username).toBe(username);
        } catch (err) {
            fail();
        }
    });
});
