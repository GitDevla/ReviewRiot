import Database from "@/util/Database"

export class PermissionModel {
    public static getLevelFromID = async (id: number) => {
        const res = (await Database.query("SELECT `level` FROM `permission` WHERE `id` = ?;", id.toString()))[0];
        if (!res[0]) return null;
        return parseInt(<string>res[0]["level"]);
    }

    public static getLevelFromName = async (name: string) => {
        const res = (await Database.query("SELECT `level` FROM `permission` WHERE `name` = ?;", name))[0];
        if (!res[0]) return null;
        return parseInt(<string>res[0]["level"]);
    }
}