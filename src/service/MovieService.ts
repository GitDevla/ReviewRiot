import { MovieWithData } from "@/interface/MovieWithData";
import { ReviewWithUser } from "@/interface/ReviewWithUser";
import { GenreModel } from "@/model/GenreModel";
import { MovieModel } from "@/model/MovieModel";
import { ReviewModel } from "@/model/ReviewModel";
import { UserModel } from "@/model/UserModel";
import { AsyncMap } from "@/util/AsyncMap";
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
    const movie = await MovieModel.getWithID(id) as MovieWithData;
    if (!movie) throw new NotFoundError("Ez a film nem létezik");
    movie.data = await movie.getData();
    let reviews = await ReviewModel.listReviewsForMovie(movie) as ReviewWithUser[];
    reviews = await AsyncMap(reviews, async (i: ReviewWithUser) => { i.author = (await UserModel.getWithID(i.authorID))!; return i; })
    return { movie, reviews };
}

export const listMovies = async (page: number, max: number, order: string, filterName: string, filterGenres: number[]) => {
    let movies;
    switch (order) {
        case "name":
        default:
            movies = await MovieModel.listByName(page, max, { name: filterName, genres: filterGenres });
            break;

        case "dname":
            movies = await MovieModel.listByNameDesc(page, max, { name: filterName, genres: filterGenres });
            break;

        case "new":
            movies = await MovieModel.listByNew(page, max, { name: filterName, genres: filterGenres });
            break;

        case "old":
            movies = await MovieModel.listByOld(page, max, { name: filterName, genres: filterGenres });
            break;

        case "top":
            movies = await MovieModel.listByTop(page, max, { name: filterName, genres: filterGenres });
            break;

        case "hot":
            movies = await MovieModel.listByHot(page, max, { name: filterName, genres: filterGenres });
            break;
    }
    movies = await AsyncMap(movies, async (i: MovieWithData) => { i.data = await i.getData(); return i })
    return movies;
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