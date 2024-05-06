import "dotenv/config";
import { deleteReq, getReq, patchReq, postReq } from "./common.test.js";
import { app } from "../app.js";
import { fail } from "assert";

let testingServer: any;

beforeAll(async () => {
    testingServer = app.listen(3001);

    await new Promise((resolve) => {
        (testingServer as any).addListener("listening", () => {
            resolve(undefined);
        });
    });
});

afterAll(async () => {
    testingServer.close();
});

describe("Categories", () => {
    let name = Math.random().toString().substring(2);
    let value = Math.random();
    let id: number;

    it("Create new post", async () => {
        let resp;
        try {
            resp = await postReq("http://localhost:3001/api/budget/category/new", {
                name: name,
                value: value
            });
        } catch (err) {
            fail();
        }

        expect(typeof resp.data).toBe("object");
        expect(resp.data.success).toBe(true);
        expect(resp.data.data.name).toBe(name);
        expect(resp.data.data.value).toBe(value);

        id = resp.data.data.id;
    });

    it("Get category", async () => {
        let resp;
        try {
            resp = await getReq(`http://localhost:3001/api/budget/category/${id}`);
        } catch (err) {
            fail();
        }

        expect(typeof resp.data).toBe("object");
        expect(resp.data.success).toBe(true);
        expect(resp.data.data.category.name).toBe(name);
        expect(resp.data.data.category.value).toBeCloseTo(value, 5);
        expect(resp.data.data.category.id).toBe(id);
    });

    it("Update category name", async () => {
        name = Math.random().toString().substring(2);

        let resp;
        try {
            resp = await patchReq(`http://localhost:3001/api/budget/category/${id}/name`, {
                name: name
            });
        } catch (err) {
            fail();
        }

        expect(typeof resp.data).toBe("object");
        expect(resp.data.success).toBe(true);
        expect(resp.data.data.category.name).toBe(name);

        try {
            resp = await getReq(`http://localhost:3001/api/budget/category/${id}`);
        } catch (err) {
            fail();
        }

        expect(typeof resp.data).toBe("object");
        expect(resp.data.success).toBe(true);
        expect(resp.data.data.category.name).toBe(name);
    });

    it("Update category value", async () => {
        value = Math.random();

        let resp;
        try {
            resp = await patchReq(`http://localhost:3001/api/budget/category/${id}/value`, {
                value: value
            });
        } catch (err) {
            fail();
        }

        expect(typeof resp.data).toBe("object");
        expect(resp.data.success).toBe(true);
        expect(resp.data.data.category.value).toBe(value);

        try {
            resp = await getReq(`http://localhost:3001/api/budget/category/${id}`);
        } catch (err) {
            fail();
        }

        expect(typeof resp.data).toBe("object");
        expect(resp.data.success).toBe(true);
        expect(resp.data.data.category.value).toBeCloseTo(value, 5);
    });

    it("Delete category value", async () => {
        let resp;

        try {
            resp = await deleteReq(`http://localhost:3001/api/budget/category/${id}`);
        } catch (err) {
            fail();
        }

        expect(typeof resp.data).toBe("object");
        expect(resp.data.success).toBe(true);
        expect(resp.data.data.id).toBe(id);

        try {
            resp = await getReq(`http://localhost:3001/api/budget/category/${id}`);
            fail();
        } catch (err) {}
    });
});
