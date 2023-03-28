import Database from "@/util/backend/Database"
import { GenreModel } from "./GenreModel";

export class MovieModel {
    //#region Properties
    public static readonly defaultCoverImage = "default.jpg";
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
        this.imagePath = "/image/movie/" + (image_path ?? MovieModel.defaultCoverImage);
    }
    //#endregion

    //#region Create
    public static create = async (name: string, release_date: Date) => {
        return Database.nonQuery("INSERT INTO `movie` (`name`,`release_date`) VALUES (?,?);", name, release_date.toISOString());
    }
    //#endregion

    private static convertToArrayOfGenres = (data: string) => {
        return data?.split(",").map((i: String) => {
            const [id, name] = i.split(";")
            return new GenreModel({ id, name });
        }
        ) ?? [];
    }

    //#region Fetch Single
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
    //#endregion

    //#region Fetch List
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

    public static listByName = async (page: number, max: number, filter: MovieFilter) => {
        const whereString = await MovieModel.filter(filter)
        return MovieModel.listMovies("movie.name ASC", page, max, whereString)
    }

    public static listByNameDesc = async (page: number, max: number, filter: MovieFilter) => {
        const whereString = await MovieModel.filter(filter)
        return MovieModel.listMovies("name DESC", page, max, whereString)
    }

    public static listByNew = async (page: number, max: number, filter: MovieFilter) => {
        const whereString = await MovieModel.filter(filter)
        return MovieModel.listMovies("release_date DESC", page, max, whereString)
    }

    public static listByOld = async (page: number, max: number, filter: MovieFilter) => {
        const whereString = await MovieModel.filter(filter)
        return MovieModel.listMovies("release_date ASC", page, max, whereString)
    }

    public static listByTop = async (page: number, max: number, filter: MovieFilter) => {
        const whereString = await MovieModel.filter(filter)
        return await MovieModel.listMovies("avgRating DESC", page, max, whereString)
    }

    public static listByHot = async (page: number, max: number, filter: MovieFilter) => {
        const filterString = await MovieModel.filter(filter);
        const lastWeekFilter = "review.create_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)";
        const whereString = filterString + " AND " + lastWeekFilter;
        return MovieModel.listMovies("avgRating DESC", page, max, whereString)
    }
    //#endregion

    //#region Update
    public update = async ({
        image_path = null as string | null,
        name = this.name,
        release = this.release,
    }
    ) => {
        if (!image_path) image_path = this.imagePath.split("/").at(-1)!;
        return Database.nonQuery("UPDATE `movie` SET `name` = ?, `release_date` = ?, `image_path` = ? WHERE `movie`.`id` = ?", name, release.toString(), image_path, this.id);
    }
    //#endregion

    private static filter = async (filter: MovieFilter) => {
        const where = [] as string[];
        if (filter.name)
            where.push(await Database.format("movie.name like ?", `%${filter.name}%`));
        if (filter.genres) {
            where.push(await MovieModel.filterByGenres(filter.genres));
        }

        return where.length ? where.join(" AND ") : "1";
    }

    private static filterByGenres = async (filterGenres: number[]) => {
        return Database.format(`movie.id IN(
            SELECT
                movie_genre.movie_id
            FROM
                movie_genre
            JOIN genre ON movie_genre.genre_id = genre.id
            WHERE
                genre.id IN(?)
            GROUP BY
                movie_genre.movie_id
            HAVING
                COUNT(DISTINCT genre.id) = ?)`, filterGenres, filterGenres.length
        )
    }
}

export interface MovieFilter {
    name: string;
    genres: number[];
}
