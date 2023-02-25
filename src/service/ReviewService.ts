import { ReviewModel } from "@/model/ReviewModel";
import { UserModel } from "@/model/UserModel";

export const createNewReview = async (author: UserModel, movie: number, rating: number, description: string, isPublic: boolean) => {
    return ReviewModel.create(author.id, movie, rating, description, isPublic);
}
