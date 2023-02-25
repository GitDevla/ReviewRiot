import { createPool, Pool } from "mysql2/promise";

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

    public static query = async (stmt: string, ...params: (string | number | boolean)[]): Promise<any[]> => {
        const db = this.getPool();
        return (await <any>db.execute(stmt, params))[0];
    }

    public static single = async (stmt: string, ...params: (string | number | boolean)[]): Promise<any> => {
        const res = await Database.query(stmt, ...params);
        return res[0];
    }

    public static getLastID = async (): Promise<string> => {
        const row = await Database.single("SELECT LAST_INSERT_ID();");
        return row['LAST_INSERT_ID()'];
    }

    public static nonQuery = async (stmt: string, ...params: (string | number | boolean)[]): Promise<string> => {
        await Database.query(stmt, ...params)
        return this.getLastID();
    }
}