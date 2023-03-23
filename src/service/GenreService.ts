import { GenreModel } from "@/model/GenreModel"

//#region READ
export const listGenres = async () => {
    return GenreModel.list();
}
//#endregion