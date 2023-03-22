import { PermissionModel } from "@/model/PermissionModel";
import { UserModel } from "@/model/UserModel"
import { BadRequestError, ConflictError, NotFoundError } from "@/util/Errors";
import { Filesystem } from "@/util/backend/Filesystem";
import { generateToken } from "./TokenService";

export const createUser = async (username: string, email: string, password: string) => {
    const userWithSameName = await UserModel.getWithName(username);
    if (userWithSameName) throw new ConflictError("Ez a felhasználónév már létezik");
    const userWithSameMail = await UserModel.getWithMail(email);
    if (userWithSameMail) throw new ConflictError("Ez a email már létezik");

    UserModel.create(username, email, password);
}

export const authUser = async (username: string, password: string) => {
    const user = await UserModel.getWithName(username);
    if (!user) return false;
    const res = await UserModel.auth(username, password);
    if (!res) return false;

    return generateToken(user.id);
}

export const checkPermission = async (user: UserModel, minLevel: number) => {
    const userLevel = await PermissionModel.getLevelFromID(user.permissionID);
    return userLevel!.level >= minLevel;
}

export const followUser = async (who: UserModel, whomID: number) => {
    if (who.id == whomID) throw new BadRequestError("Magadat nem követheted be");
    const whom = await UserModel.getWithID(whomID);
    if (!whom) throw new NotFoundError("Ez a felhasználó nem létezik");
    if (await UserModel.followExists(who, whom))
        throw new ConflictError("Ezt a felhasználót már bekövetted");

    await who.follow(whom);
    return whom;
}

export const unfollowUser = async (who: UserModel, whomID: number) => {
    if (who.id == whomID) throw new BadRequestError("Magadat nem követheted be");
    const whom = await UserModel.getWithID(whomID);
    if (!whom) throw new NotFoundError("Ez a felhasználó nem létezik");

    if (!await UserModel.followExists(who, whom))
        throw new ConflictError("Ezt a felhasználót nem követted");

    await who.unfollow(whom);
    return whom;
}

export const listUserFollows = async (whoId: number) => {
    const user = await UserModel.getWithID(whoId);
    if (!user) throw new NotFoundError("Ez a felhasználó nem létezik");

    return UserModel.listFollows(whoId);
}

export const listUsers = async () => {
    return UserModel.list();
}

export const getUserReviews = async (id: number) => {
    const user = await UserModel.getWithID(id);
    if (!user) throw new NotFoundError("Ez a film nem létezik");
    const reviews = await UserModel.listReviews(user.id);
    return { user, reviews };
}


export const changeProfilePicture = async (user: UserModel, path: string) => {
    const filename = user.picturePath.split("/").at(-1);
    if (filename != UserModel.defaultProfilePicture)
        Filesystem.remove("user/" + filename!);
    const newFile = await Filesystem.saveImage(path, "user");
    user.update({ picture_path: newFile });
}

export const changeUsername = async (user: UserModel, newName: string) => {
    const userWithSameName = await UserModel.getWithName(newName);
    if (userWithSameName) throw new ConflictError("Ez a felhasználónév már létezik");
    user.update({ username: newName });
}

export const changePassword = async (user: UserModel, newPassword: string) => {
    user.update({ password: newPassword });
}

export const changeDescription = async (user: UserModel, newDescription: string) => {
    user.update({ description: newDescription });
}

export const changeUserPermission = async (userID: number, permID: number) => {
    const whom = await UserModel.getWithID(userID);
    if (!whom) throw new NotFoundError("Ez a felhasználó nem létezik");
    const perm = await PermissionModel.getLevelFromID(permID);
    if (!perm) throw new NotFoundError("Ez a jog-szint nem létezik");
    PermissionModel.updateUser(whom, perm);
}