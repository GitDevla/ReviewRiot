import MethodRouter from '@/util/backend/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/backend/ApiResponses';
import LoginRequired from '@/util/backend/LoginRequired';
import { deleteReview } from '@/service/ReviewService';
import { BadRequestError } from '@/util/Errors';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const methodMap = {
        "DELETE": reviewDeleteHandler
    };
    await MethodRouter(req, res, methodMap);
}

async function reviewDeleteHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await LoginRequired(req);
    const { id } = req.query;
    let reviewId = parseInt(id as string);
    if (isNaN(reviewId)) throw new BadRequestError("A reviewId-nek számnak kell lennie");

    await deleteReview(user!, reviewId)
    return returnResponse(res, { message: "Review deleted" })
}