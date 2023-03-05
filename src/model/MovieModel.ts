import Database from "@/util/Database"

export class MovieModel {
    public readonly id: number;
    public readonly name: string;
    public readonly release: Date;
    public readonly rating: number;
    public readonly imagePath: string;

    constructor(dbRes: any) {
        const { id, name, release_date, avgRating, image_path } = dbRes;
        this.id = id;
        this.name = name;
        this.release = release_date;
        this.rating = avgRating;
        this.imagePath = "/image/movie/" + image_path;
    }

    private static createArray(dbRes: any) {
        let array = [];
        for (const movie of dbRes) {
            array.push(new MovieModel(movie))
        }
        return array;
    }

    public static getWithID = async (id: number) => {
        const res = await Database.single("SELECT * FROM `movie` WHERE `id` = ?;", id);
        if (!res) return null;
        return new MovieModel(res);
    }

    public static getWithName = async (name: string) => {
        const res = await Database.single("SELECT * FROM `movie` WHERE `name` = ?;", name);
        if (!res) return null;
        return new MovieModel(res);
    }


    public static create = async (name: string, release_date: Date) => {
        return Database.nonQuery("INSERT INTO `movie` (`name`,`release_date`) VALUES (?,?);", name, release_date.toISOString());
    }

    public static listByName = async (page: number, max: number) => {
        const res = await Database.query("SELECT movie.id,movie.name,movie.release_date,movie.image_path, AVG(review.rating) AS avgRating FROM `movie` LEFT JOIN review ON movie.id = review.id GROUP BY movie.id ORDER by `name` DESC limit ?,?;", page * max, max);
        return MovieModel.createArray(res);
    }

    public static listByNewest = async (page: number, max: number) => {
        const res = await Database.query("SELECT movie.id,movie.name,movie.release_date,movie.image_path, AVG(review.rating) AS avgRating FROM `movie` LEFT JOIN review ON movie.id = review.id GROUP BY movie.id ORDER by `release_date` DESC limit ?,?;", page * max, max);
        return MovieModel.createArray(res);
    }

    public static listByPopularity = async (page: number, max: number) => {
        const res = await Database.query("SELECT movie.id,movie.name,movie.release_date,movie.image_path, AVG(review.rating) AS avgRating FROM `movie` LEFT JOIN review ON movie.id = review.id GROUP BY movie.id ORDER BY avgRating DESC limit ?,?;", page * max, max);
        return MovieModel.createArray(res);
    }

    public static listByHot = async (page: number, max: number) => {
        const res = await Database.query("SELECT movie.id, movie.name, movie.release_date, movie.image_path, AVG(review.rating) AS avgRating FROM `movie` LEFT JOIN review ON movie.id = review.id WHERE review.create_date >= DATE_SUB(NOW(), INTERVAL 7 DAY) GROUP BY movie.id ORDER BY avgRating DESC limit ?,?;", page * max, max);
        return MovieModel.createArray(res);
    }
}