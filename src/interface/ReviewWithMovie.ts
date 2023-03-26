import { MovieModel } from "@/model/MovieModel";
import { ReviewModel } from "@/model/ReviewModel";

export interface ReviewWithMovie extends ReviewModel {
    movie: MovieModel;
}