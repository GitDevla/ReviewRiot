import { createPool, Pool, format } from "mysql2/promise";
type param = string | number | boolean | undefined | null | string[] | number[];
let globalPool: Pool | null = null;




export default class Database {
    private static getPool = () => {
        if (!globalPool) {
            globalPool = createPool({
                host: process.env.databaseHost,
                user: process.env.databaseUser,
                password: process.env.databasePassword,
                database: process.env.databaseDatabase
            });
        }
        return globalPool;
    }

    public static query = async (stmt: string, ...params: param[]): Promise<any[]> => {
        for (let i = 0; i < params.length; i++)
            if (params[i] == undefined) params[i] = null;
        const db = this.getPool();
        return (await <any>db.execute(stmt, params))[0];
    }

    public static single = async (stmt: string, ...params: param[]): Promise<any> => {
        const res = await Database.query(stmt, ...params);
        return res[0];
    }

    public static getLastID = async (): Promise<string> => {
        const row = await Database.single("SELECT LAST_INSERT_ID();");
        return row['LAST_INSERT_ID()'];
    }

    public static nonQuery = async (stmt: string, ...params: param[]): Promise<string> => {
        await Database.query(stmt, ...params)
        return this.getLastID();
    }

    public static format = async (stmt: string, ...params: param[]) => format(stmt, params)

    public static transform = <T>(type: { new(...args: any[]): T; }, dbRes: any): T[] =>
        dbRes.map((i: any) => new type(i));
}