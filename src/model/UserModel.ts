import { Database } from "@/util/Database"
import bcrypt from 'bcrypt';

export class UserModel {
    public static getUserWithName = async (name: string) => {
        let res = (await Database.query("SELECT * FROM `user` WHERE `name` = ?;", name))[0];
        return res[0];
    }

    public static getUserWithMail = async (mail: string) => {
        let res = (await Database.query("SELECT * FROM `auth` WHERE `email` = ?;", mail))[0];
        return res[0];
    }

    public static createUser = async (name: string, email: string, password: string) => {
        let hash = await bcrypt.hash(password, 10);
        await Database.query("INSERT INTO `user` (`name`) VALUES (?);", name);
        let userId = await Database.getLastID();
        await Database.query("INSERT INTO `auth` (`user_id`, `email`, `password_hash`) VALUES (?, ?, ?);", userId, email, hash);
    }
}