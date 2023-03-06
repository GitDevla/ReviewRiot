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

    private static listMovies = async (orderBy: string, page: number, max: number, filterBy = "1") => {
        const res = await Database.query(`
        SELECT movie.id,
            movie.name,
            movie.release_date,
            movie.image_path,
            Avg(review.rating) AS avgRating
        FROM   \`movie\`
                LEFT JOIN review
                    ON movie.id = review.id
        WHERE ${filterBy}
        GROUP  BY movie.id
        ORDER  BY ${orderBy}
        LIMIT  ?, ?;`, page * max, max);
        return Database.transform(this, res);
    }

    public static listByName = async (page: number, max: number) => {
        return MovieModel.listMovies("name ASC", page, max)
    }

    public static listByNameDesc = async (page: number, max: number) => {
        return MovieModel.listMovies("name DESC", page, max)
    }

    public static listByNew = async (page: number, max: number) => {
        return MovieModel.listMovies("release_date DESC", page, max)
    }

    public static listByOld = async (page: number, max: number) => {
        return MovieModel.listMovies("release_date ASC", page, max)
    }

    public static listByPopularity = async (page: number, max: number) => {
        return await MovieModel.listMovies("avgRating DESC", page, max)
    }

    public static listByHot = async (page: number, max: number) => {
        const lastWeekFilter = "review.create_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)";
        return MovieModel.listMovies("avgRating DESC", page, max, lastWeekFilter)
    }
}