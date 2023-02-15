import { createPool, Pool } from "mysql2/promise";

export class Database {
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

    public static query = async (stmt: string, ...params: string[]) => {
        const db = this.getPool();
        return db.execute(stmt, params);
    }
}