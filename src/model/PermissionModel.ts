import Database from "@/util/backend/Database"
import { UserModel } from "./UserModel";

export class PermissionModel {
    //#region Properties
    public readonly id: number;
    public readonly name: string;
    public readonly level: number;

    constructor(dbRes: any) {
        const { id, name, level } = dbRes;
        this.id = parseInt(id);
        this.name = name;
        this.level = parseInt(level);
    }
    //#endregion

    //#region Fetch Single
    public static getLevelFromID = async (id: number) => {
        const res = await Database.single(SQL.SELECT_ID, id);
        if (!res) return null;
        return new PermissionModel(res);
    }

    public static getLevelFromName = async (name: string) => {
        const res = await Database.single(SQL.SELECT_NAME, name);
        if (!res) return null;
        return new PermissionModel(res);
    }
    //#endregion

    //#region Fetch List
    public static list = async () => {
        const res = await Database.query(SQL.LIST);
        if (!res) return null;
        return Database.transform(this, res);
    }
    //#endregion

    //#region Update
    public static updateUser = async (user: UserModel, perms: PermissionModel) => {
        return Database.nonQuery(SQL.UPDATE, perms.id, user.id);
    }
    //#endregion
}

const SQL = {
    SELECT_ID: `SELECT * FROM permission WHERE id = ?`,
    SELECT_NAME: `SELECT * FROM permission WHERE name = ?`,
    LIST: `SELECT * FROM permission`,
    UPDATE: `UPDATE user SET permission_id = ? WHERE id = ?`
}