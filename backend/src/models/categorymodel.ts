import { RowDataPacket } from "mysql2";
import { getConnection } from "./dbconfig.js";

async function createCategory(name: string, owner: number, value: number): Promise<string|number> {
    const connection = await getConnection();
    try {
        const [result,] = await connection.execute(
            "INSERT INTO categories(name, owner, value) VALUE (?, ?, ?)",
            [name, owner, value]
        );

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
    const connection = await getConnection();
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

async function updateCategoryName(owner: number, id: number, name: string): Promise<number|string> {
    const connection = await getConnection();
    try {
        const [result,] = await connection.execute(
            "UPDATE categories SET name = ? WHERE owner = ? AND id = ?", [name, owner, id]);

        return (result as any).affectedRows as number;
    } catch (err) {
        return (err as any).code;
    }
}

async function updateCategoryValue(owner: number, id: number, value: number): Promise<number|string> {
    const connection = await getConnection();
    try {
        const [result,] = await connection.execute(
            "UPDATE categories SET value = ? WHERE owner = ? AND id = ?", [value, owner, id]);

        return (result as any).affectedRows as number;
    } catch (err) {
        return (err as any).code;
    }
}

async function deleteCategory(owner: number, id: number): Promise<number|string> {
    const connection = await getConnection();
    try {
        const [result,] = await connection.execute(
            "DELETE FROM categories WHERE owner = ? AND id = ?", [owner, id]);

        return (result as any).affectedRows as number;
    } catch (err) {
        return (err as any).code as string;
    }
}

export { createCategory, getCategory, updateCategoryName, updateCategoryValue, deleteCategory };