import { PermissionModel } from "@/model/PermissionModel";
import { UserModel } from "@/model/UserModel"
import { BadRequestError, ConflictError, NotFoundError } from "@/util/Errors";
import { generateToken } from "./TokenService";

export const createUser = async (username: string, email: string, password: string) => {
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

export const followUser = async (who: UserModel, whomID: number) => {
    if (who.id == whomID) throw new BadRequestError("You cant follow yourself");
    const whom = await UserModel.getWithID(whomID);
    if (!whom) throw new NotFoundError("User with ID doesn't exist");
    if (await UserModel.followExists(who, whom))
        throw new ConflictError("Follow already exists");

    await who.follow(whom);
    return whom;
}

export const unfollowUser = async (who: UserModel, whomID: number) => {
    if (who.id == whomID) throw new BadRequestError("You cant unmfollow yourself");
    const whom = await UserModel.getWithID(whomID);
    if (!whom) throw new NotFoundError("User with ID doesn't exist");

    if (!await UserModel.followExists(who, whom))
        throw new ConflictError("Follow doesn't exist");

    await who.unfollow(whom);
    return whom;
}

export const listUserFollows = async (whoId: number) => {
    const user = await UserModel.getWithID(whoId);
    if (!user) throw new NotFoundError("User with ID doesn't exist");

    return UserModel.listFollows(whoId);
}