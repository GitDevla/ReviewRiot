import { createUser } from '@/service/UserService';
import MethodRouter from '@/util/backend/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/backend/ApiResponses';
import { validateUserRegister } from '@/validator/userValidator';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const methodMap = {
        "POST": userPostHandler
    };
    await MethodRouter(req, res, methodMap);
}

async function userPostHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    validateUserRegister(req.body);

    const { username, password, email } = req.body;
    await createUser(username, email, password);


    return returnResponse(res, { message: `User ${username} created` })
}