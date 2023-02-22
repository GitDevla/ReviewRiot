import { UserModel } from "@/model/UserModel"
import { ConflictError } from "@/util/Errors";
import { generateToken } from "./TokenService";

export const createNewUserService = async (username: string, email: string, password: string) => {
    let userWithSameName = await UserModel.getWithName(username);
    if (userWithSameName) throw new ConflictError("Username Exists");
    let userWithSameMail = await UserModel.getWithMail(email);
    if (userWithSameMail) throw new ConflictError("Email Exists");

    UserModel.create(username, email, password);
}

export const authUserService = async (username: string, password: string) => {
    const user = await UserModel.getWithName(username);
    if (!user) return false;
    const res = await UserModel.auth(username, password);
    if (!res) return false;

    return generateToken(user["id"]);
}

export const checkAdminPermission = async (user: any) => {
    return user["permission_id"] == "2";
}