import Database from "@/util/Database"

export class MovieModel {
    public readonly name: string;
    public readonly release: Date;

    constructor(dbRes: any) {
        const { name, release_date } = dbRes;
        this.name = name;
        this.release = release_date;
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

    public static fetchOrderedByName = async (page: number, max: number) => {
        const res = await Database.query("SELECT * from `movie` ORDER by `name` ASC limit ?,?;", page * max, max);
        return MovieModel.createArray(res);
    }

    public static fetchOrderedByNewest = async (page: number, max: number) => {
        const res = await Database.query("SELECT * from `movie` ORDER by `release_date` DESC limit ?,?;", page * max, max);
        return MovieModel.createArray(res);
    }

}