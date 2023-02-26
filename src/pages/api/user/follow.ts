import { followUser } from '@/service/UserService';
import MethodRouter from '@/util/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/ApiResponses';
import { Validate } from '@/util/Validator';
import LoginRequired from '@/util/LoginRequired';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const methodMap = {
        "POST": followPostHandler
    };
    await MethodRouter(req, res, methodMap);
}


function validateBody(body: any) {
    Validate(body.whom)
        .required("Whom is required")
        .number("Whom cannot be empty")
        .min(1, "Whom has to be between higher than 1")
}

async function followPostHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = LoginRequired(req);
    validateBody(req.body);

    const { whom } = req.body;
    const whomUser = await followUser((await user)!, whom);


    return returnResponse(res, { message: `You started following ${whomUser.name}` })
}