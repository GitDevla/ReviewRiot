import { authUser } from '@/service/UserService';
import MethodRouter from '@/util/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'cookies-next';
import { returnResponse } from '@/util/ApiResponses';
import LoginRequired from '@/util/LoginRequired';
import { UnauthorizedError } from '@/util/Errors';
import { Validate } from '@/util/Validator';

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
    Validate(req.body.username).required("Username required").string("Username has to be a string");
    Validate(req.body.password).required("Password required").string("Password has to be a string");
    const { username, password }: authRequestBody = req.body;
    const jwt = await authUser(username, password);
    if (!jwt) throw new UnauthorizedError("Invalid Username or Password");

    setCookie('token', jwt.token, { res, req, maxAge: 60 * 60 * 24 * 90 });
    return returnResponse(res, { message: jwt })
}

async function authGetHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const user = await LoginRequired(req);
    return returnResponse(res, { message: "Logged in as " + user!.name, user: user!.covertToSafe() })
}