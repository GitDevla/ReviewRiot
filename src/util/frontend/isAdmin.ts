import { PermissionLevel } from "../PermissionLevels";
import { Fetch } from "./Fetch";

export const getIsAdmin = async () => {
    const level = await getUserPermission();
    if (level == -1) throw Error();
    if (level < PermissionLevel.admin) throw Error();
}

export const getUserPermission = async () => {
    const res = await Fetch.GET("/api/permission");
    if (!res.ok) return -1;
    const json = await res.json();
    return json.level;
}