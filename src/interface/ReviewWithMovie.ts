import { MovieModel } from "@/model/MovieModel";
import { ReviewModel } from "@/model/ReviewModel";

export interface ReviewWithMovieModel extends ReviewModel {
    movie: MovieModel;
}