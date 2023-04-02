import { ReviewModel } from "@/model/ReviewModel";
import { UserModel } from "@/model/UserModel";

export interface ReviewWithUserModel extends ReviewModel {
    author: UserModel;
}