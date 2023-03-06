import Database from "@/util/Database"
import { MovieModel } from "./MovieModel";
import { UserModel } from "./UserModel";

export class FeedModel {
    public readonly id: number;
    public readonly rating: number;
    public readonly description: string;
    public readonly createDate: Date;
    public readonly author: UserModel;
    public readonly movie: MovieModel;

    constructor(dbRes: any) {
        const { id, rating, description, create_date, name, picture_path, movie_name, image_path } = dbRes;
        this.id = id;
        this.rating = rating;
        this.description = description;
        this.createDate = create_date;
        this.author = new UserModel({ name, picture_path });
        this.movie = new MovieModel({ name: movie_name, image_path })
    }

    public static listFeed = async (user: UserModel, page: number, max: number) => {
        const res = await Database.query("SELECT review.id, review.rating, review.description, review.create_date, USER.name, USER.picture_path, movie.name as movie_name, movie.image_path FROM review JOIN USER ON review.author_id = USER.id JOIN movie ON review.movie_id = movie.id WHERE USER.id IN( SELECT whom_id FROM follow WHERE who_id = ? ) ORDER by create_date limit ?,?;", user.id, page, max)
        return Database.transform(this, res);
    }
}