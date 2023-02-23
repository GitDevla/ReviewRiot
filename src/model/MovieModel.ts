import Database from "@/util/Database"

export class MovieModel {
    public static getWithID = async (id: number) => {
        const res = (await Database.query("SELECT * FROM `movie` WHERE `id` = ?;", id))[0];
        return res[0];
    }

    public static getWithName = async (name: string) => {
        const res = (await Database.query("SELECT * FROM `movie` WHERE `name` = ?;", name))[0];
        return res[0];
    }

    public static create = async (name: string, release_date: Date) => {
        return Database.nonQuery("INSERT INTO `movie` (`name`,`release_date`) VALUES (?,?);", name, release_date.toISOString());
    }

}