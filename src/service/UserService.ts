import { UserModel } from "@/model/UserModel"
import bcrypt from 'bcrypt';

export const createNewUserService = async (username: string, email: string, password: string) => {
    let userWithSameName = await UserModel.getWithName(username);
    if (userWithSameName) throw new Error("Username Exists");
    let userWithSameMail = await UserModel.getWithMail(email);
    if (userWithSameMail) throw new Error("Email Exists");

    UserModel.create(username, email, password);
}

export const authUserService = async (username: string, password: string) => {
    const user = await UserModel.getWithName(username);
    if (!user) return false;
    const res = await UserModel.auth(username, password);
    if (!res) return false;
    return true;
}