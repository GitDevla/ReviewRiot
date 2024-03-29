import MethodRouter from '@/util/backend/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'cookies-next';
import { returnResponse } from '@/util/backend/ApiResponses';
import LoginRequired from '@/util/backend/LoginRequired';
import { UnauthorizedError } from '@/util/Errors';
import { validateAuthBody } from '@/validator/userValidator';
import { authUser } from '@/service/AuthService';

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

async function authPostHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    validateAuthBody(req.body);
    const { username, password } = req.body;
    const jwt = await authUser(username, password);
    if (!jwt) throw new UnauthorizedError("Hibás felhasználónév vagy jelszó");

    setCookie('token', jwt.token, { res, req, maxAge: 60 * 60 * 24 * 90 });
    return returnResponse(res, { message: jwt })
}

async function authGetHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await LoginRequired(req);
    return returnResponse(res, { user: user!.covertToSafe() })
}