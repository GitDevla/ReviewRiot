import MethodRouter from '@/util/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/ApiResponses';
import LoginRequired from '@/util/LoginRequired';
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

    const { movieID, rating, description, isPublic } = req.body;
    await createReview(user!, movieID, rating, description, isPublic)
    return returnResponse(res, { message: "New review created" })
}