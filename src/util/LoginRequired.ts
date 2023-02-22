import { UserModel } from "@/model/UserModel";
import { validateToken } from "@/service/TokenService";
import { getCookie } from "cookies-next";
import { NextApiRequest } from "next";
import { UnauthorizedError } from "./Errors";

export default async (req: NextApiRequest) => {
    const cookie = getCookie("token", { req });
    if (!cookie) throw new UnauthorizedError("Not logged in")
    var token = await validateToken(cookie.toString());
    if (!token) throw new UnauthorizedError("Not logged in")

    return UserModel.getWithID(token.userId);
}