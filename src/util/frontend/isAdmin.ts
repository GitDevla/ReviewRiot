import { PermissionLevel } from "../PermissionLevels";
import { Fetch } from "./Fetch";

export const isAdmin = async () => {
    const res = await Fetch.GET("/api/permission");
    if (!res.ok) throw Error();
    const json = await res.json();
    if (json.level < PermissionLevel.admin) throw Error();
}

export const getUserPermission = async () => {
    const res = await Fetch.GET("/api/permission");
    if (!res.ok) return -1;
    const json = await res.json();
    return json.level;
}