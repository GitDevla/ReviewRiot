import { ReviewWithUser } from "@/interface/ReviewWithUser";
import { GenreModel } from "@/model/GenreModel";
import { MovieModel } from "@/model/MovieModel";
import { ReviewModel } from "@/model/ReviewModel";
import { UserModel } from "@/model/UserModel";
import { Filesystem } from "@/util/backend/Filesystem";
import { ConflictError, NotFoundError } from "@/util/Errors";

//#region CREATE
export const createMovie = async (name: string, date: Date) => {
    const userWithSameName = await MovieModel.getWithName(name);
    if (userWithSameName) throw new ConflictError("Ez a film már létezik");

    return MovieModel.create(name, date);
}
//#endregion

//#region READ
export const getMovieReviews = async (id: number) => {
    const movie = await MovieModel.getWithID(id);
    if (!movie) throw new NotFoundError("Ez a film nem létezik");
    const reviews = await ReviewModel.listReviewsForMovie(movie) as ReviewWithUser[];
    for (const i of reviews) {
        i.author = (await UserModel.getWithID(i.authorID))!;
    }
    return { movie, reviews };
}

export const listMovies = async (page: number, max: number, order: string, filterName: string, filterGenres: number[]) => {
    switch (order) {
        case "name":
        default:
            return MovieModel.listByName(page, max, { name: filterName, genres: filterGenres });

        case "dname":
            return MovieModel.listByNameDesc(page, max, { name: filterName, genres: filterGenres });

        case "new":
            return MovieModel.listByNew(page, max, { name: filterName, genres: filterGenres });

        case "old":
            return MovieModel.listByOld(page, max, { name: filterName, genres: filterGenres });

        case "top":
            return MovieModel.listByTop(page, max, { name: filterName, genres: filterGenres });

        case "hot":
            return MovieModel.listByHot(page, max, { name: filterName, genres: filterGenres });
    }
}
//#endregion

//#region UPDATE
export const updateMovieCoverPhoto = async (movieID: number, path: string) => {
    const movie = await MovieModel.getWithID(movieID);
    if (!movie) throw new NotFoundError("Ez a film nem létezik");
    const filename = movie.imagePath.split("/").at(-1);
    if (filename != MovieModel.defaultCoverImage)
        Filesystem.remove("movie/" + filename!);
    const newFile = await Filesystem.saveImage(path, "movie");
    movie.update({ image_path: newFile });
}

export const updateMovieName = async (movieID: number, newName: string) => {
    const movie = await MovieModel.getWithID(movieID);
    if (!movie) throw new NotFoundError("Ez a film nem létezik");
    const userWithSameName = await MovieModel.getWithName(newName);
    if (userWithSameName) throw new ConflictError("Ez a film már létezik");
    movie.update({ name: newName });
}

export const updateMovieRelease = async (movieID: number, newRelease: Date) => {
    const movie = await MovieModel.getWithID(movieID);
    if (!movie) throw new NotFoundError("Ez a film nem létezik");
    movie.update({ release: newRelease });
}

export const updateMovieGenres = async (movieID: number, genres: number[]) => {
    const movie = await MovieModel.getWithID(movieID);
    if (!movie) throw new NotFoundError("Ez a film nem létezik");
    for (const genre of genres) {
        const exists = await GenreModel.getById(genre);
        if (!exists) throw new NotFoundError("Ez a műfaj nem létezik");
    }
    GenreModel.updateMovieGenres(movie.id, genres);
}
//#endregion