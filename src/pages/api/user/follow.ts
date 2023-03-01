import { followUser, listUserFollows } from '@/service/UserService';
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
        "GET": followGetHandler,
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

async function followGetHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = LoginRequired(req);
    let userID = parseInt(req.query["user"] as string);
    if (isNaN(userID)) userID = (await user)!.id

    const whomUser = (await listUserFollows(userID)).map(i => i.covertToSafe());
    return returnResponse(res, whomUser)
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