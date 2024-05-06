import { fail } from "assert";
import { app } from "../app.js";
import { deleteReq, getReq, patchReq, postReq } from "./common.test.js";

let testingServer: any;
let catName = Math.random().toString().substring(2);
let catValue = Math.random();
let catId: number;

beforeAll(async () => {
    testingServer = app.listen(3002);

    await new Promise((resolve) => {
        (testingServer as any).addListener("listening", () => {
            resolve(undefined);
        });
    });

    let resp = await postReq("http://localhost:3002/api/budget/category/new", {
        name: catName,
        value: catValue
    });
    catId = resp.data.data.id;
});

afterAll(async () => {
    testingServer.close();
});

describe("Expenses", () => {
    const year = Math.floor(Math.random() * 3000);
    const month = Math.floor(Math.random() * 12) + 1;
    let value = Math.random();
    let id: number;

    it("Create new expense", async () => {
        let resp;
        try {
            resp = await postReq(`http://localhost:3002/api/budget/expense/new`, {
                category: catId,
                year: year,
                month: month,
                value: value
            });
        } catch (err) {
            fail();
        }

        expect(typeof resp.data).toBe("object");
        expect(resp.data.success).toBe(true);
        expect(typeof resp.data.data.id).toBe("number");

        id = resp.data.data.id;
    });

    it("Get expense", async () => {
        let resp;
        try {
            resp = await getReq(`http://localhost:3002/api/budget/expense/${id}`);
        } catch (err) {
            fail();
        }

        expect(typeof resp.data).toBe("object");
        expect(resp.data.success).toBe(true);

        let expense = resp.data.data.expense;
        expect(expense.id).toBe(id);
        expect(expense.year).toBe(year);
        expect(expense.month).toBe(month);
        expect(expense.value).toBeCloseTo(value, 5);
    });

    it("Update expense", async () => {
        value = Math.random();

        let resp;
        try {
            resp = await patchReq(`http://localhost:3002/api/budget/expense/${id}`, {
                value: value
            });
        } catch (err) {
            fail();
        }

        expect(typeof resp.data).toBe("object");
        expect(resp.data.success).toBe(true);

        try {
            resp = await getReq(`http://localhost:3002/api/budget/expense/${id}`);
        } catch (err) {
            fail();
        }

        expect(typeof resp.data).toBe("object");
        expect(resp.data.success).toBe(true);

        let expense = resp.data.data.expense;
        expect(expense.id).toBe(id);
        expect(expense.year).toBe(year);
        expect(expense.month).toBe(month);
        expect(expense.value).toBeCloseTo(value, 5);
    });

    it("Delete expense", async () => {
        let resp;
        try {
            resp = await deleteReq(`http://localhost:3002/api/budget/expense/${id}`);
        } catch (err) {
            fail();
        }

        expect(typeof resp.data).toBe("object");
        expect(resp.data.success).toBe(true);

        try {
            await getReq(`http://localhost:3002/api/budget/expense/${id}`);
            fail();
        } catch (err) {}
    });
});
