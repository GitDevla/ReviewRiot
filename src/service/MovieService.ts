import { MovieModel } from "@/model/MovieModel";
import { ConflictError } from "@/util/Errors";

export const createNewMovie = async (name: string, date: Date) => {
    const userWithSameName = await MovieModel.getWithName(name);
    if (userWithSameName) throw new ConflictError("Movie already exists");

    MovieModel.create(name, date);
}