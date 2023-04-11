import Database from "@/util/backend/Database"
import { MovieModel } from "./MovieModel";

export class ReviewModel {
    //#region Properties
    public readonly id: number;
    public readonly authorID: number;
    public readonly movieID: number;
    public readonly rating: number;
    public readonly description: string | null;
    public readonly create: Date;

    constructor(dbRes: any) {
        const { id, author_id, movie_id, rating, description, create_date } = dbRes;
        this.id = id;
        this.authorID = author_id;
        this.movieID = movie_id;
        this.rating = rating;
        this.description = description;
        this.create = create_date;
    }
    //#endregion

    //#region Create
    public static create = async (authorID: number, movieID: number, rating: number, description: string) => {
        return Database.nonQuery(SQL.INSERT,
            authorID, movieID, rating, description);
    }
    //#endregion

    //#region Fetch Single
    public static getWithID = async (id: number) => {
        const res = await Database.single(SQL.SELECT_ID, id);
        if (!res) return null;
        return new ReviewModel(res);
    }
    //#endregion

    //#region Fetch List
    public static listReviewsForMovie = async (movie: MovieModel, page: number, max: number) => {
        const res = await Database.query(SQL.LIST, movie.id, page * max, max);
        return Database.transform(this, res);
    }
    //#endregion

    //#region Delete
    public static delete = async (id: number) => {
        return Database.nonQuery(SQL.DELETE, id);
    }
    //#endregion
}

const SQL = {
    INSERT: `INSERT INTO review (author_id, movie_id, rating, description) VALUES (?, ?, ?, ?)`,
    SELECT_ID: `SELECT * FROM review WHERE id = ?`,
    LIST: `SELECT * FROM review WHERE movie_id = ? ORDER by create_date DESC LIMIT ?, ?`,
    DELETE: `DELETE FROM review WHERE id = ?`,
}
