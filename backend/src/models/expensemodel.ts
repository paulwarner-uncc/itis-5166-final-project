import { RowDataPacket } from "mysql2";
import { connection } from "./dbconfig.js";

async function upsertExpense(category: number, owner: number, year: number, month: number,
                             value: number): Promise<number|string> {
    try {
        const [result,] = await connection.execute(
            "INSERT INTO expenses(category, owner, year, month, value) VALUE (?, ?, ?, ?, ?)" +
            "ON DUPLICATE KEY UPDATE value = ?",
            [category, owner, year, month, value, value]
        );

        return (result as any).insertId;
    } catch (err) {
        return (err as any).code;
    }
}

async function getExpenses(owner: number): Promise<RowDataPacket[]|string> {
    try {
        const [result,] = await connection.execute("SELECT * FROM expenses WHERE owner = ?",
            [owner]);

        return result as RowDataPacket[];
    } catch (err) {
        return (err as any).code;
    }
}

async function getExpense(owner: number, id: number): Promise<RowDataPacket[]|string> {
    try {
        const [result,] = await connection.execute(
            "SELECT * FROM expenses WHERE owner = ? AND id = ?",
            [owner, id]
        );

        return result as RowDataPacket[];
    } catch (err) {
        return (err as any).code;
    }
}

async function getExpensesByDate(owner: number, year: number, month?: number): Promise<RowDataPacket[]|string> {
    try {
        let data: RowDataPacket[];
        if (typeof month === "number") {
            data = (await connection.execute(
                "SELECT * FROM expenses WHERE owner = ? AND year = ? AND month = ?",
                [owner, year, month]
            ))[0] as RowDataPacket[];
        } else {
            data = (await connection.execute(
                "SELECT * FROM expenses WHERE owner = ? AND year = ?",
                [owner, year]
            ))[0] as RowDataPacket[];
        }
        return data;
    } catch (err) {
        return (err as any).code;
    }
}

async function getExpensesByCategory(owner: number, category: number): Promise<RowDataPacket[]|string> {
    try {
        const [result,] = await connection.execute(
            "SELECT * FROM expenses WHERE owner = ? AND category = ?",
            [owner, category]
        );

        return result as RowDataPacket[];
    } catch (err) {
        return (err as any).code;
    }
}

async function updateValue(owner: number, id: number, value: number): Promise<number|string> {
    try {
        const [result, ] = await connection.execute(
            "UPDATE expenses SET value = ? WHERE owner = ? AND id = ?",
            [value, owner, id]
        ) as [RowDataPacket, any];

        return result.affectedRows;
    } catch (err) {
        return (err as any).code;
    }
}

async function deleteExpense(owner: number, id: number): Promise<number|string> {
    try {
        const [result,] = await connection.execute(
            "DELETE FROM expenses WHERE owner = ? AND id = ?", [owner, id]);

        return (result as any).affectedRows as number;
    } catch (err) {
        return (err as any).code as string;
    }
}

export { upsertExpense, getExpenses, getExpense, getExpensesByDate, getExpensesByCategory,
    updateValue, deleteExpense };