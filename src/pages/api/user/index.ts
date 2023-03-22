import { checkPermission, createUser, listUsers } from '@/service/UserService';
import MethodRouter from '@/util/backend/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/backend/ApiResponses';
import { validateUserRegister } from '@/validator/userValidator';
import LoginRequired from '@/util/backend/LoginRequired';
import { PermissionLevel } from '@/util/PermissionLevels';
import { ForbiddenError } from '@/util/Errors';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const methodMap = {
        "GET": userGetHandler,
        "POST": userPostHandler
    };
    await MethodRouter(req, res, methodMap);
}

async function userGetHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await LoginRequired(req);
    if (!(await checkPermission(user!, PermissionLevel.admin))) throw new ForbiddenError();

    const users = await listUsers();
    return returnResponse(res, { users })
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