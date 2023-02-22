import Database from "@/util/Database"
import bcrypt from 'bcrypt';

export class UserModel {
    public static getWithID = async (id: number) => {
        let res = (await Database.query("SELECT * FROM `user` WHERE `id` = ?;", id.toString()))[0];
        return res[0];
    }

    public static getWithName = async (name: string) => {
        let res = (await Database.query("SELECT * FROM `user` WHERE `name` = ?;", name))[0];
        return res[0];
    }

    public static getWithMail = async (mail: string) => {
        let res = (await Database.query("SELECT * FROM `auth` WHERE `email` = ?;", mail))[0];
        return res[0];
    }

    public static create = async (name: string, email: string, password: string) => {
        let hash = await bcrypt.hash(password, 10);
        let userId = await Database.nonQuery("INSERT INTO `user` (`name`) VALUES (?);", name);
        await Database.nonQuery("INSERT INTO `auth` (`user_id`, `email`, `password_hash`) VALUES (?, ?, ?);", userId, email, hash);
    }

    public static auth = async (username: string, plainPassword: string) => {
        const hash = (await Database.query("SELECT `password_hash` FROM `user` join `auth` on `auth`.`user_id` = `user`.`id` where `user`.`name` = ?;", username))[0][0]["password_hash"];
        return bcrypt.compare(plainPassword, hash);
    }
}