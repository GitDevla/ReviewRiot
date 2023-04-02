import Database from "@/util/backend/Database";
import { UserModel } from "./UserModel";

export class FollowModel {
    public static followExists = async (who: UserModel, whom: UserModel) => {
        return Database.single(SQL.SELECT_FOLLOW, who.id, whom.id);
    }

    public static follow = async (who: UserModel, whom: UserModel) => {
        await Database.nonQuery(SQL.INSERT_FOLLOW, who.id, whom.id);
    }

    public static unfollow = async (who: UserModel, whom: UserModel) => {
        await Database.nonQuery(SQL.DELETE_FOLLOW, who.id, whom.id);
    }

    public static listFollows = async (who: number) => {
        const res = await Database.query(SQL.LIST_FOLLOW, who);
        return Database.transform(UserModel, res);
    }
}

const SQL = {
    SELECT_FOLLOW: `SELECT * FROM follow WHERE who_id = ? AND whom_id = ?`,
    INSERT_FOLLOW: `INSERT INTO follow (who_id, whom_id) VALUES (?, ?)`,
    DELETE_FOLLOW: `DELETE FROM follow WHERE who_id = ? AND whom_id = ?`,
    LIST_FOLLOW: `
    SELECT
        *
    FROM
        follow
    JOIN user ON user.id = follow.whom_id
    WHERE
        follow.who_id = ?`
}
