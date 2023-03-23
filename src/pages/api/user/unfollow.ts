import MethodRouter from '@/util/backend/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/backend/ApiResponses';
import LoginRequired from '@/util/backend/LoginRequired';
import { followValidator } from '@/validator/userValidator';
import { unfollowUser } from '@/service/FollowService';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const methodMap = {
        "POST": followPostHandler
    };
    await MethodRouter(req, res, methodMap);
}

async function followPostHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await LoginRequired(req);
    followValidator(req.body);

    const { whom } = req.body;
    const whomUser = await unfollowUser(user!, whom);

    return returnResponse(res, { message: `You unfollowed ${whomUser.name}` })
}