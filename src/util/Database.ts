import { createPool, OkPacket, Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";

export default class Database {
    private static connection: Pool;

    private static getPool = () => {
        if (!this.connection) this.connection = createPool({
            host: process.env.databaseHost,
            user: process.env.databaseUser,
            password: process.env.databasePassword,
            database: process.env.databaseDatabase
        });
        return this.connection;
    }

    public static query = async (stmt: string, ...params: string[]): Promise<any[]> => {
        const db = this.getPool();
        return db.execute(stmt, params);
    }

    public static getLastID = async (): Promise<string> => {
        let [rows] = await Database.query("SELECT LAST_INSERT_ID();");
        return rows[0]['LAST_INSERT_ID()'];
    }

    public static nonQuery = async (stmt: string, ...params: string[]): Promise<string> => {
        const db = this.getPool();
        await db.execute(stmt, params);
        return this.getLastID();
    }
}