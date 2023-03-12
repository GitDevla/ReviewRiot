import { MovieModel } from "@/model/MovieModel";
import { ReviewModel } from "@/model/ReviewModel";
import { ConflictError, NotFoundError } from "@/util/Errors";

export const createMovie = async (name: string, date: Date) => {
    const userWithSameName = await MovieModel.getWithName(name);
    if (userWithSameName) throw new ConflictError("Ez a film már létezik");

    MovieModel.create(name, date);
}

export const getMovieReviews = async (id: number) => {
    const movie = await MovieModel.getWithID(id);
    if (!movie) throw new NotFoundError("Ez a film nem létezik");
    const reviews = await ReviewModel.listReviewsForMovie(movie);
    return { movie, reviews };
}

export const listMovies = async (page: number, max: number, order: string) => {
    switch (order) {
        case "name":
            return MovieModel.listByName(page, max);

        case "dname":
            return MovieModel.listByNameDesc(page, max);

        case "new":
            return MovieModel.listByNew(page, max);

        case "old":
            return MovieModel.listByOld(page, max);

        case "top":
            return MovieModel.listByTop(page, max);

        case "hot":
            return MovieModel.listByHot(page, max);

        default:
            break;
    }
}