import Database from "@/util/backend/Database"
import { UserModel } from "./UserModel";

export class PermissionModel {
    public readonly id: number;
    public readonly name: string;
    public readonly level: number;

    constructor(dbRes: any) {
        const { id, name, level } = dbRes;
        this.id = parseInt(id);
        this.name = name;
        this.level = parseInt(level);
    }

    public static getLevelFromID = async (id: number) => {
        const res = await Database.single("SELECT * FROM `permission` WHERE `id` = ?;", id);
        if (!res) return null;
        return new PermissionModel(res);
    }

    public static getLevelFromName = async (name: string) => {
        const res = await Database.single("SELECT * FROM `permission` WHERE `name` = ?;", name);
        if (!res) return null;
        return new PermissionModel(res);
    }

    public static list = async () => {
        const res = await Database.query("SELECT * FROM `permission`;");
        if (!res) return null;
        return Database.transform(this, res);
    }

    public static updateUser = async (user: UserModel, perms: PermissionModel) => {
        return Database.nonQuery("UPDATE `user` SET `permission_id` = ? WHERE `user`.`id` = ?;", perms.id, user.id);
    }
}