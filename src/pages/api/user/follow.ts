import { followUser, listUserFollows } from '@/service/UserService';
import MethodRouter from '@/util/backend/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/backend/ApiResponses';
import LoginRequired from '@/util/backend/LoginRequired';
import { followValidator } from '@/validator/userValidator';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const methodMap = {
        "GET": followGetHandler,
        "POST": followPostHandler
    };
    await MethodRouter(req, res, methodMap);
}

async function followGetHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await LoginRequired(req);

    const whomUser = (await listUserFollows(user!.id)).map(i => i.covertToSafe());
    return returnResponse(res, whomUser)
}

async function followPostHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await LoginRequired(req);
    followValidator(req.body);

    const { whom } = req.body;
    const whomUser = await followUser(user!, whom);

    return returnResponse(res, { message: `You started following ${whomUser.name}` })
}