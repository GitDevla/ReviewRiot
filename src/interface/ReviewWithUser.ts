import { ReviewModel } from "@/model/ReviewModel";
import { UserModel } from "@/model/UserModel";

export interface ReviewWithUser extends ReviewModel {
    author: UserModel;
}