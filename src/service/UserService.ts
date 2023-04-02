import { ReviewWithMovieModel } from "@/interface/ReviewWithMovie";
import { MovieModel } from "@/model/MovieModel";
import { PermissionModel } from "@/model/PermissionModel";
import { UserModel } from "@/model/UserModel";
import { Filesystem } from "@/util/backend/Filesystem";
import { ConflictError, NotFoundError } from "@/util/Errors";

//#region CREATE
export const createUser = async (username: string, email: string, password: string) => {
    const userWithSameName = await UserModel.getWithName(username);
    if (userWithSameName) throw new ConflictError("Ez a felhasználónév már létezik");
    const userWithSameMail = await UserModel.getWithMail(email);
    if (userWithSameMail) throw new ConflictError("Ez a email már létezik");

    UserModel.create(username, email, password);
}
//#endregion

//#region READ
export const checkPermission = async (user: UserModel, minLevel: number) => {
    const userLevel = await PermissionModel.getLevelFromID(user.permissionID);
    return userLevel!.level >= minLevel;
}

export const listUsers = async () => {
    return UserModel.list();
}

export const getUserReviews = async (id: number) => {
    const user = await UserModel.getWithID(id);
    if (!user) throw new NotFoundError("Ez a film nem létezik");
    const reviews = await UserModel.listReviews(user.id) as ReviewWithMovieModel[];
    for (const i of reviews) {
        i.movie = (await MovieModel.getWithID(i.movieID))!;
    }
    return { user, reviews };
}
//#endregion

//#region UPDATE
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
//#endregion