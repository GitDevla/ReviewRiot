import Database from "@/util/backend/Database"

export class PermissionModel {
    public static getLevelFromID = async (id: number) => {
        const res = await Database.single("SELECT `level` FROM `permission` WHERE `id` = ?;", id);
        if (!res) return null;
        return parseInt(<string>res["level"]);
    }

    public static getLevelFromName = async (name: string) => {
        const res = await Database.single("SELECT `level` FROM `permission` WHERE `name` = ?;", name);
        if (!res) return null;
        return parseInt(<string>res["level"]);
    }
}