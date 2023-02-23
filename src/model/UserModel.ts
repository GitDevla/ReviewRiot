import Database from "@/util/Database"
import bcrypt from 'bcrypt';

export class UserModel {
    public readonly id: number;
    public readonly name: string;
    public readonly created: Date;
    public readonly description: string;
    public readonly picturePath: string;
    public readonly permissionID: number;

    private constructor(dbRes: any) {
        const { id, name, created_at, description, picture_path, permission_id } = dbRes;
        this.id = parseInt(id);
        this.name = name;
        this.created = new Date(created_at);
        this.description = description;
        this.picturePath = picture_path;
        this.permissionID = parseInt(permission_id);
    }

    public static getWithID = async (id: number) => {
        const res = (await Database.query("SELECT * FROM `user` WHERE `id` = ?;", id))[0];
        if (!res[0]) return null;
        return new UserModel(res[0]);
    }

    public static getWithName = async (name: string) => {
        const res = (await Database.query("SELECT * FROM `user` WHERE `name` = ?;", name))[0];
        if (!res[0]) return null;
        return new UserModel(res[0]);
    }

    public static getWithMail = async (mail: string) => {
        const res = (await Database.query("SELECT * FROM `auth` WHERE `email` = ?;", mail))[0];
        if (!res[0]) return null;
        return new UserModel(res[0]);
    }

    public static create = async (name: string, email: string, password: string) => {
        const hash = await bcrypt.hash(password, 10);
        const userId = await Database.nonQuery("INSERT INTO `user` (`name`) VALUES (?);", name);
        await Database.nonQuery("INSERT INTO `auth` (`user_id`, `email`, `password_hash`) VALUES (?, ?, ?);", userId, email, hash);
    }

    public static auth = async (username: string, plainPassword: string) => {
        const hash = (await Database.query("SELECT `password_hash` FROM `user` join `auth` on `auth`.`user_id` = `user`.`id` where `user`.`name` = ?;", username))[0][0]["password_hash"];
        return bcrypt.compare(plainPassword, hash);
    }
}