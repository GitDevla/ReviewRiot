import Database from "@/util/Database"

export class ReviewModel {
    // public readonly authorID: number;
    // public readonly movieID: number;
    // public readonly rating: number;
    // public readonly description: string | null;
    // public readonly create: Date;
    // public readonly isPublic: Date;

    public static create = async (authorID: number, movieID: number, rating: number, description: string, isPublic: boolean) => {
        return Database.nonQuery("INSERT INTO `review` (`author_id`, `movie_id`, `rating`, `description`, `is_public`) VALUES (?, ?, ?, ?, ?);",
            authorID, movieID, rating, description, isPublic);
    }
}