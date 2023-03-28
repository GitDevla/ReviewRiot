import MethodRouter from '@/util/backend/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/backend/ApiResponses';
import LoginRequired from '@/util/backend/LoginRequired';
import { createReview } from '@/service/ReviewService';
import { validateReviewCreate } from '@/validator/reviewValidator';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const methodMap = {
        "POST": reviewPostHandler
    };
    await MethodRouter(req, res, methodMap);
}

async function reviewPostHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await LoginRequired(req);
    validateReviewCreate(req.body);

    const { movieID, rating, description } = req.body;
    await createReview(user!, movieID, rating, description)
    return returnResponse(res, { message: "New review created" })
}