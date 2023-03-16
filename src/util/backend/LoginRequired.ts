import { UserModel } from "@/model/UserModel";
import { validateToken } from "@/service/TokenService";
import { getCookie } from "cookies-next";
import { NextApiRequest } from "next";
import { UnauthorizedError } from "../Errors";

export default async (req: NextApiRequest) => {
    const cookie = getCookie("token", { req });
    if (!cookie) throw new UnauthorizedError()
    const token = await validateToken(cookie.toString());
    if (!token) throw new UnauthorizedError()

    return UserModel.getWithID(token.userId);
}