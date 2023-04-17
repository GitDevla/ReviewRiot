import Database from "@/util/backend/Database";

export const globalSearchByName = async (param: string) => {
    param = "%" + param + "%";
    return Database.query(SQL.LIST, param, param);
}

const SQL = {
    LIST: `(SELECT
        id,
        name,
        'user' AS type
    FROM
        user
    WHERE name LIKE
        ?
        LIMIT 15)
    UNION(
    SELECT
        id,
        name,
        'movie' as type
    FROM
        movie
    WHERE name LIKE
        ?
    LIMIT 15);`
}