import { MovieModel } from "@/model/MovieModel";

export interface MovieWithData extends MovieModel {
    data: MovieData;
}

export interface MovieData {
    rating: number;
    NOReviews: number;
}