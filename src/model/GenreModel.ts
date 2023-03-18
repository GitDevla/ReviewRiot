import Database from "@/util/backend/Database";

export class GenreModel {
    public readonly id: number;
    public readonly name: number;

    constructor(dbRes: any) {
        const { id, name } = dbRes;
        this.id = id;
        this.name = name;
    }

    public static getById = async (id: number) => {
        return Database.transform(this, await Database.query("SELECT * FROM genre where id = ?;", id))
    }

    public static list = async () => {
        return Database.transform(this, await Database.query("SELECT * FROM genre;"))
    }

    public static updateMovieGenres = async (movieID: number, genres: number[]) => {
        await Database.nonQuery("DELETE FROM movie_genre WHERE `movie_genre`.`movie_id` = ?;", movieID);
        genres.forEach(async i => {
            await Database.query("INSERT INTO `movie_genre` (`movie_id`, `genre_id`) VALUES (?, ?)", movieID, i);
        });
    }

}