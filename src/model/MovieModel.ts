import Database from "@/util/backend/Database"
import { GenreModel } from "./GenreModel";

export class MovieModel {
    public readonly id: number;
    public readonly name: string;
    public readonly release: Date;
    public readonly rating: number;
    public readonly NOReviews: number;
    public readonly imagePath: string;
    public readonly genres: GenreModel[];

    constructor(dbRes: any) {
        const { id, name, release_date, avgRating, image_path, genres, number_of_reviews } = dbRes;
        this.id = id;
        this.name = name;
        this.release = release_date;
        this.rating = avgRating;
        this.NOReviews = number_of_reviews
        this.genres = MovieModel.convertToArrayOfGenres(genres);
        this.imagePath = "/image/movie/" + image_path;
    }

    private static convertToArrayOfGenres = (data: string) => {
        return data?.split(",").map((i: String) => {
            const [id, name] = i.split(";")
            return new GenreModel({ id, name });
        }
        ) ?? [];
    }

    public static getWithID = async (id: number) => {
        const res = await Database.single(`SELECT movie.id,movie.name,movie.release_date,
        movie.image_path,GROUP_CONCAT(DISTINCT CONCAT(genre.id, ';', genre.name)) as genres FROM movie left join movie_genre
        on movie.id = movie_genre.movie_id
    left join genre
        on genre.id = movie_genre.genre_id WHERE movie.id = ?;`, id);
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
            Avg(review.rating) AS avgRating,
            COUNT(DISTINCT review.id) as number_of_reviews,
            GROUP_CONCAT(DISTINCT CONCAT(genre.id, ';', genre.name)) as genres
        FROM   \`movie\`
                LEFT JOIN review
                    ON movie.id = review.movie_id
                left join movie_genre
                	on movie.id = movie_genre.movie_id
                left join genre
                	on genre.id = movie_genre.genre_id
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

    public static listByTop = async (page: number, max: number) => {
        return await MovieModel.listMovies("avgRating DESC", page, max)
    }

    public static listByHot = async (page: number, max: number) => {
        const lastWeekFilter = "review.create_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)";
        return MovieModel.listMovies("avgRating DESC", page, max, lastWeekFilter)
    }

    public update = async ({
        image_path = null as string | null,
        name = this.name,
        release = this.release,
    }
    ) => {
        if (!image_path) image_path = this.imagePath.split("/").at(-1)!;
        return Database.nonQuery("UPDATE `movie` SET `name` = ?, `release_date` = ?, `image_path` = ? WHERE `movie`.`id` = ?", name, release.toString(), image_path, this.id);
    }
}