import { SafeUserModel } from "@/interface/SafeUserModel";
import Database from "@/util/backend/Database"
import bcrypt from 'bcrypt';
import { ReviewModel } from "./ReviewModel";

export class UserModel {
    //#region Properties
    public static readonly defaultProfilePicture = "default.webp";
    public readonly id: number;
    public readonly name: string;
    public readonly created: Date;
    public readonly description: string;
    public readonly picturePath: string;
    public readonly permissionID: number;

    constructor(dbRes: any) {
        const { id, name, created_at, description, picture_path, permission_id } = dbRes;
        this.id = id;
        this.name = name;
        this.created = created_at;
        this.description = description;
        this.picturePath = "/image/user/" + (picture_path ?? UserModel.defaultProfilePicture);
        this.permissionID = permission_id;
    }
    //#endregion

    //#region Create
    public static create = async (name: string, email: string, password: string) => {
        const hash = await bcrypt.hash(password, 10);
        const userId = await Database.nonQuery(SQL.INSERT_USER, name);
        await Database.nonQuery(SQL.INSERT_AUTH, userId, email, hash);
    }
    //#endregion

    //#region Fetch Single
    public static auth = async (username: string, plainPassword: string) => {
        const hash = (await Database.single(SQL.AUTH, username))?.password_hash;
        if (!hash) return false;
        return bcrypt.compare(plainPassword, hash);
    }

    public static getWithID = async (id: number) => {
        const res = await Database.single(SQL.SELECT_USER_ID, id);
        if (!res) return null;
        return new UserModel(res);
    }

    public static getWithName = async (name: string) => {
        const res = await Database.single(SQL.SELECT_USER_NAME, name);
        if (!res) return null;
        return new UserModel(res);
    }

    public static getWithMail = async (mail: string) => {
        const res = await Database.single(SQL.SELECT_AUTH_MAIL, mail);
        if (!res) return null;
        return new UserModel(res);
    }
    //#endregion

    //#region Fetch List
    public static list = async () => {
        const res = await Database.query(SQL.LIST);
        return Database.transform(this, res);
    }

    public static listReviews = async (who: number, page: number, max: number) => {
        const res = await Database.query(SQL.LIST_REVIEW, who, page * max, max);
        return Database.transform(ReviewModel, res);
    }
    //#endregion


    //#region Update
    public update = async ({
        picture_path = null as string | null,
        username = this.name,
        password = null as string | null,
        description = this.description,
    }
    ) => {
        if (!picture_path) picture_path = this.picturePath.split("/").at(-1)!;
        if (password) {
            var hash = await bcrypt.hash(password, 10);
            await Database.nonQuery(SQL.UPDATE_AUTH, hash, this.id);
        }
        return Database.nonQuery(SQL.UPDATE_USER, username, picture_path, description, this.id);
    }
    //#endregion

    public covertToSafe(): SafeUserModel {
        return {
            "id": this.id,
            "name": this.name,
            "created": this.created,
            "description": this.description,
            "picturePath": this.picturePath,
        }
    }
}
const SQL = {
    INSERT_USER: `INSERT INTO user (name) VALUES (?)`,
    INSERT_AUTH: `INSERT INTO auth (user_id, email, password_hash) VALUES (?, ?, ?)`,
    AUTH: `
    SELECT
        auth.password_hash
    FROM
        user
    JOIN auth ON auth.user_id = user.id
    WHERE
        user.name = ?`,
    SELECT_USER_ID: `SELECT * FROM user WHERE id = ?`,
    SELECT_USER_NAME: `SELECT * FROM user WHERE name = ?`,
    SELECT_AUTH_MAIL: `SELECT * FROM auth WHERE email = ?`,
    LIST: `SELECT * FROM user`,
    LIST_REVIEW: `
    SELECT
        review.*
    FROM
        review
    JOIN user ON review.author_id = user.id
    WHERE
        author_id = ?
    ORDER BY
        review.create_date
    DESC
    LIMIT ?, ?`,
    UPDATE_AUTH: `
    UPDATE
        auth
    SET
        password_hash = ?
    WHERE
        auth.user_id = ?`,
    UPDATE_USER: `
    UPDATE
        user
    SET name = ?,
        picture_path = ?,
        description = ?
    WHERE
        user.id = ?`
}
