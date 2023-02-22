import { authUserService } from '@/service/UserService';
import { UnauthorizedError } from '@/util/Errors';
import MethodRouter from '@/util/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie, setCookie } from 'cookies-next';
import { validateToken } from '@/service/TokenService';
import { returnResponse } from '@/util/ApiResponses';
import { UserModel } from '@/model/UserModel';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const methodMap = {
        "GET": authGetHandler,
        "POST": authPostHandler
    };
    await MethodRouter(req, res, methodMap);
}

interface authRequestBody {
    username: string;
    password: string;
}

async function authPostHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let { username, password }: authRequestBody = req.body;
    const jwt = await authUserService(username, password);
    if (!jwt)
        return returnResponse(res, { message: `Nope` })

    setCookie('token', jwt.token, { req, res, maxAge: 60 * 60 * 24 * 90 });
    return returnResponse(res, { message: jwt })
}

async function authGetHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // This is just a test path
    const cookie = getCookie("token", { req });
    if (!cookie) throw new UnauthorizedError("Not logged in")
    var token = await validateToken(cookie.toString());
    if (!token) throw new UnauthorizedError("Not logged in")

    let user = await UserModel.getWithID(token.userId)
    return returnResponse(res, { message: "Logged in as " + user["name"] })
}