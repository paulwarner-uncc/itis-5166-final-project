import mysql, { RowDataPacket } from "mysql2/promise";
import "dotenv/config";

const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

async function getUser(username: string): Promise<RowDataPacket|string> {
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
    try {
        await connection.execute("INSERT INTO users(username, password) VALUE (?, ?)",
            [username, hash]);
        return null;
    } catch (err) {
        return (err as any).code;
    }
}

export { getUser, createUser };