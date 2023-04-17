import { MovieData } from "@/interface/MovieWithData";
import Database from "@/util/backend/Database"
import { GenreModel } from "./GenreModel";

export class MovieModel {
    //#region Properties
    public static readonly defaultCoverImage = "default.jpg";
    public readonly id: number;
    public name: string;
    public release: Date;
    public imagePath: string;
    public genres: GenreModel[];

    constructor(dbRes: any) {
        const { id, name, release_date, image_path, genres } = dbRes;
        this.id = id;
        this.name = name;
        this.release = release_date;
        this.genres = MovieModel.convertToArrayOfGenres(genres);
        this.imagePath = "/image/movie/" + (image_path ?? MovieModel.defaultCoverImage);
    }
    //#endregion

    //#region Create
    public static create = async (name: string, release_date: Date) => {
        return Database.nonQuery(SQL.INSERT, name, release_date.getFullYear());
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
        const res = await Database.single(SQL.SELECT_ID, id);
        if (!res) return null;
        return new MovieModel(res);
    }

    public static getWithName = async (name: string) => {
        const res = await Database.single(SQL.SELECT_NAME, name);
        if (!res) return null;
        return new MovieModel(res);
    }

    public getData = async (): Promise<MovieData> => {
        const res = await Database.single(SQL.SELECT_DATA, this.id);
        return {
            rating: parseFloat(res.avgRating),
            NOReviews: parseInt(res.number_of_reviews),
            NOReviewsLastWeek: parseInt(res.reviews_last_7_days),
            rank: parseInt(res.rank)
        };
    }
    //#endregion

    //#region Fetch List
    private static listMovies = async (orderBy: string, page: number, max: number, filterBy = "1") => {
        const res = await Database.query(`
        SELECT movie.id,
            movie.name,
            movie.release_date,
            movie.image_path,
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

    public static listOnlyName = async () => {
        const res = await Database.query("SELECT id,name from movie order by name;");
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
        return await MovieModel.listMovies("Avg(review.rating) DESC, COUNT(DISTINCT review.id) DESC", page, max, whereString)
    }

    public static listByHot = async (page: number, max: number, filter: MovieFilter) => {
        const filterString = await MovieModel.filter(filter);
        const lastWeekFilter = "review.create_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)";
        const whereString = filterString + " AND " + lastWeekFilter;
        return MovieModel.listMovies("COUNT(DISTINCT review.id) DESC", page, max, whereString)
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
        return Database.nonQuery(SQL.UPDATE, name, release.toString(), image_path, this.id);
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
        return Database.format(SQL.FILTER_GENRE, filterGenres, filterGenres.length)
    }
}

const SQL = {
    INSERT: `INSERT INTO movie (name,release_date) VALUES (?,?);`,
    SELECT_ID: `
    SELECT
        movie.id,
        movie.name,
        movie.release_date,
        movie.image_path,
        GROUP_CONCAT(
            DISTINCT CONCAT(genre.id, ';', genre.name)
        ) AS genres
    FROM
        movie
    LEFT JOIN movie_genre ON movie.id = movie_genre.movie_id
    LEFT JOIN genre ON genre.id = movie_genre.genre_id
    WHERE
        movie.id = ?
    GROUP BY movie.id;`,
    SELECT_NAME: `
    SELECT
        movie.id,
        movie.name,
        movie.release_date,
        movie.image_path,
        GROUP_CONCAT(
            DISTINCT CONCAT(genre.id, ';', genre.name)
        ) AS genres
    FROM
        movie
    LEFT JOIN movie_genre ON movie.id = movie_genre.movie_id
    LEFT JOIN genre ON genre.id = movie_genre.genre_id
    WHERE
        movie.name = ?
    GROUP BY movie.id;`,
    SELECT_DATA: `
    SELECT
        AVG(review.rating) AS avgRating,
        COUNT(DISTINCT review.id) AS number_of_reviews,
        COUNT(DISTINCT CASE WHEN review.create_date >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN review.id END) AS reviews_last_7_days,
        FIND_IN_SET(AVG(review.rating),(SELECT GROUP_CONCAT(avrg) from (SELECT avg(rating) as avrg from review GROUP by movie_id order by avrg desc) as _)) AS rank
    FROM
        movie
    LEFT JOIN review ON movie.id = review.movie_id
    WHERE
        movie.id = ?;`,
    UPDATE: `UPDATE movie SET name = ?, release_date = ?, image_path = ? WHERE id = ?`,
    FILTER_GENRE: `
    movie.id IN(
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
        COUNT(DISTINCT genre.id) = ?)`,
}


export interface MovieFilter {
    name: string;
    genres: number[];
}
