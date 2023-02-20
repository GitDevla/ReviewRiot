import { authUserService, createNewUserService } from '@/service/UserService';
import { returnResponse, throwServerError, throwValidationError } from '@/util/ApiResponses';
import MethodRouter from '@/util/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import { validateToken } from '@/service/TokenService';

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
    const a = getCookie("token", { req });
    if (!a) return throwServerError(res, "Not logged in")
    var user = await validateToken(a.toString());
    if (!user) return throwServerError(res, "Not logged in")

    return returnResponse(res, { message: "Logged in" })
}