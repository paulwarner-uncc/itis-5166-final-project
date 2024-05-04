import mysql from "mysql2/promise";
import "dotenv/config";

let conn: mysql.Connection|null = null;
async function getConnection(): Promise<mysql.Connection> {
    if (conn === null) {
        conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE
        });
    }
    return conn;
}

export { getConnection };