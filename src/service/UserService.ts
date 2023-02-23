import { PermissionModel } from "@/model/PermissionModel";
import { UserModel } from "@/model/UserModel"
import { ConflictError } from "@/util/Errors";
import { generateToken } from "./TokenService";

export const createNewUser = async (username: string, email: string, password: string) => {
    const userWithSameName = await UserModel.getWithName(username);
    if (userWithSameName) throw new ConflictError("Username Exists");
    const userWithSameMail = await UserModel.getWithMail(email);
    if (userWithSameMail) throw new ConflictError("Email Exists");

    UserModel.create(username, email, password);
}

export const authUser = async (username: string, password: string) => {
    const user = await UserModel.getWithName(username);
    if (!user) return false;
    const res = await UserModel.auth(username, password);
    if (!res) return false;

    return generateToken(user.id);
}

export const checkAdminPermission = async (user: UserModel) => {
    const userLevel = await PermissionModel.getLevelFromID(user.permissionID);
    const adminLevel = await PermissionModel.getLevelFromName("Admin");
    return userLevel! >= adminLevel!;
}