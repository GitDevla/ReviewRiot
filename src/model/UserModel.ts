import Database from "@/util/Database"
import bcrypt from 'bcrypt';

export class UserModel {
    public readonly id: number;
    public readonly name: string;
    public readonly created: Date;
    public readonly description: string;
    public readonly picturePath: string;
    public readonly permissionID: number;

    constructor(dbRes: any) {
        const { id, name, created_at, description, picture_path, permission_id } = dbRes;
        this.id = id;
        this.name = name;
        this.created = created_at;
        this.description = description;
        this.picturePath = picture_path;
        this.permissionID = permission_id;
    }

    public static getWithID = async (id: number) => {
        const res = await Database.single("SELECT * FROM `user` WHERE `id` = ?;", id);
        if (!res) return null;
        return new UserModel(res);
    }

    public static getWithName = async (name: string) => {
        const res = await Database.single("SELECT * FROM `user` WHERE `name` = ?;", name);
        if (!res) return null;
        return new UserModel(res);
    }

    public static getWithMail = async (mail: string) => {
        const res = await Database.single("SELECT * FROM `auth` WHERE `email` = ?;", mail);
        if (!res) return null;
        return new UserModel(res);
    }

    public static create = async (name: string, email: string, password: string) => {
        const hash = await bcrypt.hash(password, 10);
        const userId = await Database.nonQuery("INSERT INTO `user` (`name`) VALUES (?);", name);
        await Database.nonQuery("INSERT INTO `auth` (`user_id`, `email`, `password_hash`) VALUES (?, ?, ?);", userId, email, hash);
    }

    public static auth = async (username: string, plainPassword: string) => {
        const hash = (await Database.single("SELECT `password_hash` FROM `user` join `auth` on `auth`.`user_id` = `user`.`id` where `user`.`name` = ?;", username))?.password_hash;
        if (!hash) return false;
        return bcrypt.compare(plainPassword, hash);
    }

    public static followExists = async (who: UserModel, whom: UserModel) => {
        return await Database.single("SELECT * FROM `follow` WHERE `who_id` = ? AND `whom_id` = ?;", who.id, whom.id);
    }

    public follow = async (whom: UserModel) => {
        await Database.nonQuery("INSERT INTO `follow` (`who_id`, `whom_id`) VALUES (?, ?);", this.id, whom.id);
    }

    public unfollow = async (whom: UserModel) => {
        await Database.nonQuery("DELETE FROM `follow` WHERE `who_id` = ? AND `whom_id` = ?;", this.id, whom.id);
    }

    public static listFollows = async (who: number) => {
        const res = await Database.query("SELECT * FROM `follow` JOIN `user` ON `user`.`id`=`follow`.`whom_id` WHERE `follow`.`who_id` = ?;", who);
        let arr = [];
        for (const q of res)
            arr.push(new UserModel(q))
        return arr;
    }

    public covertToSafe() {
        return {
            "id": this.id,
            "name": this.name,
            "created": this.created,
            "description": this.description,
            "picture": this.picturePath,
        }
    }
}