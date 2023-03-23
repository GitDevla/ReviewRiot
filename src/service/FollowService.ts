import { UserModel } from "@/model/UserModel";
import { BadRequestError, ConflictError, NotFoundError } from "@/util/Errors";

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

export const isFollowing = async (who: UserModel, whomID: number) => {
    const user = await UserModel.getWithID(whomID);
    if (!user) throw new NotFoundError("Ez a felhasználó nem létezik");
    return UserModel.followExists(who, user)
}