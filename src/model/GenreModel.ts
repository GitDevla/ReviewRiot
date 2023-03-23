import Database from "@/util/backend/Database";

export class GenreModel {
    //#region Properties
    public readonly id: number;
    public readonly name: number;

    constructor(dbRes: any) {
        const { id, name } = dbRes;
        this.id = id;
        this.name = name;
    }
    //#endregion

    //#region Fetch Single
    public static getById = async (id: number) => {
        return Database.transform(this, await Database.query("SELECT * FROM genre where id = ?;", id))
    }
    //#endregion

    //#region Fetch List
    public static list = async () => {
        return Database.transform(this, await Database.query("SELECT * FROM genre;"))
    }
    //#endregion

    //#region Update
    public static updateMovieGenres = async (movieID: number, genres: number[]) => {
        await Database.nonQuery("DELETE FROM movie_genre WHERE `movie_genre`.`movie_id` = ?;", movieID);
        genres.forEach(async i => {
            await Database.query("INSERT INTO `movie_genre` (`movie_id`, `genre_id`) VALUES (?, ?)", movieID, i);
        });
    }
    //#endregion
}