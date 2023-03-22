import MethodRouter from '@/util/backend/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/backend/ApiResponses';
import { getUserReviews } from '@/service/UserService';
import { BadRequestError } from '@/util/Errors';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const methodMap = {
        "GET": userGetHandler
    };
    await MethodRouter(req, res, methodMap);
}

async function userGetHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;
    let userID = parseInt(id as string);
    if (isNaN(userID)) throw new BadRequestError("A userID-nek számnak kell lennie");

    const { user, reviews } = await getUserReviews(userID);
    return returnResponse(res, { user, reviews })
}

