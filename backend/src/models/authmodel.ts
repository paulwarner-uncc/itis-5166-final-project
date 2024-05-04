import { RowDataPacket } from "mysql2/promise";
import "dotenv/config";
import { getConnection } from "./dbconfig.js";

async function getUser(username: string): Promise<RowDataPacket|string> {
    const connection = await getConnection();
    try {
        const [result,] = await connection.execute(
            "SELECT * FROM users WHERE username = ? LIMIT 1", [username]);

        if ((result as any).length == 0) {
            return "ER_NO_USER";
        }

        return (result as RowDataPacket[])[0];
    } catch (err) {
        return (err as any).code as string;
    }
}

async function createUser(username: string, hash: string): Promise<string|null> {
    const connection = await getConnection();
    try {
        await connection.execute("INSERT INTO users(username, password) VALUE (?, ?)",
            [username, hash]);
        return null;
    } catch (err) {
        if ((err as any).code === "ER_DUP_ENTRY") {
            return "ER_DUP_USER";
        }

        return (err as any).code;
    }
}

export { getUser, createUser };