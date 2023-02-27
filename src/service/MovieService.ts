import { MovieModel } from "@/model/MovieModel";
import { ConflictError } from "@/util/Errors";

export const createMovie = async (name: string, date: Date) => {
    const userWithSameName = await MovieModel.getWithName(name);
    if (userWithSameName) throw new ConflictError("Movie already exists");

    MovieModel.create(name, date);
}

export const listMovies = async (page: number, max: number, order: string) => {
    switch (order) {
        case "name":
            return MovieModel.listByName(page, max);

        case "date":
            return MovieModel.listByNewest(page, max);

        default:
            break;
    }
}