import Database from "@/util/Database"

export class ReviewModel {
    public readonly id: number;
    public readonly authorID: number;
    public readonly movieID: number;
    public readonly rating: number;
    public readonly description: string | null;
    public readonly create: Date;
    public readonly isPublic: boolean;

    constructor(dbRes: any) {
        const { id, author_id, movie_id, rating, description, create_date, is_public } = dbRes;
        this.id = parseInt(id);
        this.authorID = parseInt(author_id);
        this.movieID = parseInt(movie_id);
        this.rating = parseInt(rating);
        this.description = description;
        this.create = new Date(create_date);
        this.isPublic = <boolean>is_public;
    }

    public static create = async (authorID: number, movieID: number, rating: number, description: string, isPublic: boolean) => {
        return Database.nonQuery("INSERT INTO `review` (`author_id`, `movie_id`, `rating`, `description`, `is_public`) VALUES (?, ?, ?, ?, ?);",
            authorID, movieID, rating, description, isPublic);
    }

    public static delete = async (id: number) => {
        return Database.nonQuery("DELETE FROM review WHERE `review`.`id` = ?;", id);
    }

    public static getWithID = async (id: number) => {
        const res = await Database.single("SELECT * FROM `review` WHERE id = ?;", id);
        if (!res) return null;
        return new ReviewModel(res);
    }
}