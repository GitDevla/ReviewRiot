import MethodRouter from '@/util/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/ApiResponses';
import LoginRequired from '@/util/LoginRequired';
import { createNewReview } from '@/service/ReviewService';
import { Validate } from '@/util/Validator';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const methodMap = {
        "POST": reviewPostHandler
    };
    await MethodRouter(req, res, methodMap);
}

function validatePostBody(body: any) {
    Validate(body.movieID)
        .required("movieID is required")
        .number("The movieID has to be a number")
        .min(1, "The movieID can be less then 1");
    Validate(body.rating)
        .required("rating is required")
        .number("The rating has to be a number")
        .valueBetween(0, 10, "The rating has to be between 0-10");
    Validate(body.isPublic)
        .required("isPublic is required")
        .bool("The isPublic has to be a boolean");
    Validate(body.description)
        .nonRequired()?.lengthBetween(16, 255, "The description length has to be between 16-255");
    return;
}

async function reviewPostHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await LoginRequired(req);
    validatePostBody(req.body);

    const { movieID, rating, description, isPublic } = req.body;
    await createNewReview(user!, movieID, rating, description, isPublic)
    return returnResponse(res, { message: "New review created" })
}