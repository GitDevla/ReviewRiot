import Database from "@/util/Database";

export class GenreModel {
    public readonly id: number;
    public readonly name: number;

    constructor(dbRes: any) {
        const { id, name } = dbRes;
        this.id = id;
        this.name = name;
    }

    public static list = async () => {
        return Database.transform(this, await Database.query("SELECT * FROM genre;"))
    }
}