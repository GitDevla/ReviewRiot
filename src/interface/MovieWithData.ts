import { MovieModel } from "@/model/MovieModel";

export interface MovieWithDataModel extends MovieModel {
    data: MovieData;
}

export interface MovieData {
    rating: number;
    NOReviews: number;
}