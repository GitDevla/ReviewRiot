import { unfollowUser } from '@/service/UserService';
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
        "POST": followPostHandler
    };
    await MethodRouter(req, res, methodMap);
}

async function followPostHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = LoginRequired(req);
    followValidator(req.body);

    const { whom } = req.body;
    const whomUser = await unfollowUser((await user)!, whom);


    return returnResponse(res, { message: `You unfollowed ${whomUser.name}` })
}