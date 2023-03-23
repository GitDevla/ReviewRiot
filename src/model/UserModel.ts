import Database from "@/util/backend/Database"
import bcrypt from 'bcrypt';
import { ReviewModel } from "./ReviewModel";

export class UserModel {
    //#region Properties
    public static readonly defaultProfilePicture = "default.png";
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
        this.picturePath = "/image/user/" + (picture_path ?? UserModel.defaultProfilePicture);
        this.permissionID = permission_id;
    }
    //#endregion

    //#region Fetch Single
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
    //#endregion

    //#region Fetch List
    public static list = async () => {
        const res = await Database.query("SELECT * FROM `user`;");
        return Database.transform(this, res);
    }
    //#endregion

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

    //#region Follow
    public static followExists = async (who: UserModel, whom: UserModel) => {
        return Database.single("SELECT * FROM `follow` WHERE `who_id` = ? AND `whom_id` = ?;", who.id, whom.id);
    }

    public follow = async (whom: UserModel) => {
        await Database.nonQuery("INSERT INTO `follow` (`who_id`, `whom_id`) VALUES (?, ?);", this.id, whom.id);
    }

    public unfollow = async (whom: UserModel) => {
        await Database.nonQuery("DELETE FROM `follow` WHERE `who_id` = ? AND `whom_id` = ?;", this.id, whom.id);
    }

    public static listFollows = async (who: number) => {
        const res = await Database.query("SELECT * FROM `follow` JOIN `user` ON `user`.`id`=`follow`.`whom_id` WHERE `follow`.`who_id` = ?;", who);
        return Database.transform(this, res);
    }

    public static listReviews = async (who: number) => {
        const res = await Database.query("SELECT * FROM `review` JOIN `user` on review.author_id = user.id WHERE author_id=?;", who);
        return Database.transform(ReviewModel, res);
    }
    //#endregion

    //#region Update
    public update = async ({
        picture_path = null as string | null,
        username = this.name,
        password = null as string | null,
        description = this.description,
    }
    ) => {
        if (!picture_path) picture_path = this.picturePath.split("/").at(-1)!;
        if (password) {
            var hash = await bcrypt.hash(password, 10);
            await Database.nonQuery("UPDATE `auth` SET `password_hash` = ? WHERE `auth`.`user_id` = ?", hash, this.id);
        }
        return Database.nonQuery("UPDATE `user` SET name = ?, `picture_path` = ?, description = ? WHERE `user`.`id` = ?", username, picture_path, description, this.id);
    }
    //#endregion

    public covertToSafe() {
        return {
            "id": this.id,
            "name": this.name,
            "created": this.created,
            "description": this.description,
            "picturePath": this.picturePath,
        }
    }
}