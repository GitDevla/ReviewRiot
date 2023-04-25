import { AsyncMap } from "@/util/AsyncMap";
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
        return Database.transform(this, await Database.query(SQL.SELECT_ID, id))
    }
    //#endregion

    //#region Fetch List
    public static list = async () => {
        return Database.transform(this, await Database.query(SQL.LIST))
    }
    //#endregion

    //#region Update
    public static updateMovieGenres = async (movieID: number, genres: number[]) => {
        await Database.nonQuery(SQL.DELETE, movieID);
        if (genres[0] != 0)
            await AsyncMap(genres, async (i: number) => Database.query(SQL.INSERT_movID_genID, movieID, i))
    }
    //#endregion
}
const SQL = {
    INSERT_movID_genID: `INSERT INTO movie_genre (movie_id, genre_id) VALUES (?, ?)`,
    SELECT_ID: `SELECT * FROM genre where id = ?`,
    LIST: `SELECT * FROM genre ORDER BY name`,
    DELETE: `DELETE FROM movie_genre WHERE movie_id = ?`
}