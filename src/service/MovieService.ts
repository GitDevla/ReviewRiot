import { GenreModel } from "@/model/GenreModel";
import { MovieModel } from "@/model/MovieModel";
import { ReviewModel } from "@/model/ReviewModel";
import { Filesystem } from "@/util/backend/Filesystem";
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


export const updateMovieCoverPhoto = async (movieID: number, path: string) => {
    const movie = await MovieModel.getWithID(movieID);
    if (!movie) throw new NotFoundError("Ez a film nem létezik");
    const filename = movie.imagePath.split("/").at(-1);
    if (filename != "default.png")
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