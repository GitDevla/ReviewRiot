import { authUserService, createNewUserService } from '@/service/UserService';
import { returnResponse, throwValidationError } from '@/util/ApiResponses';
import { isEmptyString } from '@/util/Checks';
import MethodRouter from '@/util/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const methodMap = {
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
    const auth = await authUserService(username, password);
    if (!auth)
        return returnResponse(res, { message: `Nope` })

    return returnResponse(res, { message: `Good job` })
}