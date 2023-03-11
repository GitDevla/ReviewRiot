import { UserModel } from "@/model/UserModel";
import { deleteCookie, getCookie } from "cookies-next";

export const useUser = async () => {
    const token = getCookie("token");
    if (!token) return null;

    const storage = sessionStorage.getItem("user");
    if (storage) return JSON.parse(storage) as UserModel;

    const res = await fetch('/api/auth');
    if (!res.ok) return null;
    const json = await res.json();
    sessionStorage.setItem("user", JSON.stringify(json.user));
    return json.user as UserModel;
}

export const logout = async () => {
    deleteCookie("token");
    sessionStorage.removeItem("user");
    window.location.reload();
}