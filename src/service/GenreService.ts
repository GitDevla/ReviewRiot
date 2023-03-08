import { GenreModel } from "@/model/GenreModel"

export const listGenres = async () => {
    return GenreModel.list();
}