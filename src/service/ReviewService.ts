import { FeedModel } from "@/model/FeedModel";
import { ReviewModel } from "@/model/ReviewModel";
import { UserModel } from "@/model/UserModel";
import { ForbiddenError, NotFoundError } from "@/util/Errors";
import { PermissionLevel } from "@/util/PermissionLevels";
import { checkPermission } from "./UserService";

//#region CREATE
export const createReview = async (author: UserModel, movie: number, rating: number, description: string) => {
    return ReviewModel.create(author.id, movie, rating, description);
}
//#endregion

//#region READ
export const listFeed = async (user: UserModel, page: number, max: number) => {
    return FeedModel.listFeed(user, page, max);
}
//#endregion

//#region DELETE
export const deleteReview = async (user: UserModel, reviewID: number) => {
    const review = await ReviewModel.getWithID(reviewID);
    if (!review) throw new NotFoundError("Nincs ilyen értékelés");
    const isModerator = await checkPermission(user, PermissionLevel.moderator);
    if (review.authorID != user.id && !isModerator)
        throw new ForbiddenError("A értékelés törléséhez nincs jogod");

    return ReviewModel.delete(review.id);
}
//#endregion