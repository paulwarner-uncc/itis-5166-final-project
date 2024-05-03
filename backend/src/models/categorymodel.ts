import { RowDataPacket } from "mysql2";
import { connection } from "./dbconfig.js";

async function createCategory(name: string, owner: number): Promise<string|number> {
    try {
        const [result,] = await connection.execute("INSERT INTO categories(name, owner) VALUE (?, ?)",
            [name, owner]);

        return (result as any).insertId;
    } catch (err) {
        if ((err as any).code === "ER_DUP_ENTRY") {
            return "ER_DUP_CAT";
        }

        return (err as any).code;
    }
}

// Retrieve the specified category by id. If no id was specified, return all categories.
async function getCategory(owner: number, id?: number): Promise<RowDataPacket[]|string>{
    if (id === undefined) {
        try {
            const [result,] = await connection.execute("SELECT * FROM categories WHERE owner=?",
                [owner]);

            return result as RowDataPacket[];
        } catch (err) {
            return (err as any).code;
        }
    } else {
        try {
            const [result,] = await connection.execute(
                "SELECT * FROM categories WHERE owner=? AND id=?", [owner, id]);

            return result as RowDataPacket[];
        } catch (err) {
            return (err as any).code;
        }
    }
}

async function updateCategory(owner: number, id: number, name: string): Promise<number|string> {
    try {
        const [result,] = await connection.execute(
            "UPDATE categories SET name = ? WHERE owner = ? AND id = ?", [name, owner, id]);

        return (result as any).affectedRows as number;
    } catch (err) {
        return (err as any).code;
    }
}

async function deleteCategory(owner: number, id: number): Promise<number|string> {
    try {
        const [result,] = await connection.execute(
            "DELETE FROM categories WHERE owner = ? AND id = ?", [owner, id]);

        return (result as any).affectedRows as number;
    } catch (err) {
        return (err as any).code as string;
    }
}

export { createCategory, getCategory, updateCategory, deleteCategory };