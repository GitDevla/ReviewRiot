import Database from "@/util/Database"
import { UserModel } from "./UserModel";

export class FeedModel {
    public readonly id: number;
    public readonly rating: number;
    public readonly description: string;
    public readonly createDate: Date;
    public readonly authorName: string;
    public readonly authorImg: string;
    public readonly movieName: string;
    public readonly movieImg: string;
    constructor(dbRes: any) {
        const { id, rating, description, create_date, name, picture_path, movie_name, image_path } = dbRes;
        this.id = parseInt(id);
        this.rating = parseInt(rating);
        this.description = description;
        this.createDate = new Date(create_date);
        this.authorName = name;
        this.authorImg = picture_path;
        this.movieName = movie_name;
        this.movieImg = image_path;
    }

    public static listFeed = async (user: UserModel, page: number, max: number) => {
        return Database.query("SELECT review.id, review.rating, review.description, review.create_date, USER.name, USER.picture_path, movie.name as movie_name, movie.image_path FROM review JOIN USER ON review.author_id = USER.id JOIN movie ON review.movie_id = movie.id WHERE USER.id IN( SELECT whom_id FROM follow WHERE who_id = ? ) ORDER by create_date limit ?,?;", user.id, page, max)
    }
}