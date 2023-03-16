import MethodRouter from '@/util/backend/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/backend/ApiResponses';
import LoginRequired from '@/util/backend/LoginRequired';
import { createReview, deleteReview } from '@/service/ReviewService';
import { validateReviewCreate } from '@/validator/reviewValidator';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const methodMap = {
        "POST": reviewPostHandler,
        "DELETE": reviewDeleteHandler
    };
    await MethodRouter(req, res, methodMap);
}

async function reviewPostHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await LoginRequired(req);
    validateReviewCreate(req.body);

    const { movieID, rating, description, isPublic } = req.body;
    await createReview(user!, movieID, rating, description, isPublic)
    return returnResponse(res, { message: "New review created" })
}

async function reviewDeleteHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await LoginRequired(req);
    const { id } = req.query;
    let reviewId = parseInt(id as string);

    await deleteReview(user!, reviewId)
    return returnResponse(res, { message: "Review deleted" })
}