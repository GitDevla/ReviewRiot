import { authUserService } from '@/service/UserService';
import MethodRouter from '@/util/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'cookies-next';
import { returnResponse } from '@/util/ApiResponses';
import LoginRequired from '@/util/LoginRequired';

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

    setCookie('token', jwt.token, { res, req, maxAge: 60 * 60 * 24 * 90 });
    return returnResponse(res, { message: jwt })
}

async function authGetHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let user = await LoginRequired(req);
    return returnResponse(res, { message: "Logged in as " + user["name"] })
}