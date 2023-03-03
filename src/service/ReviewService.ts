import { FeedModel } from "@/model/FeedMode";
import { ReviewModel } from "@/model/ReviewModel";
import { UserModel } from "@/model/UserModel";

export const createReview = async (author: UserModel, movie: number, rating: number, description: string, isPublic: boolean) => {
    return ReviewModel.create(author.id, movie, rating, description, isPublic);
}

export const listFeed = async (user: UserModel, page: number, max: number) => {
    return FeedModel.listFeed(user, page, max);
}