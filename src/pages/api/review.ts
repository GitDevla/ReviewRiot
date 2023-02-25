import MethodRouter from '@/util/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/ApiResponses';
import LoginRequired from '@/util/LoginRequired';
import { createNewReview } from '@/service/ReviewService';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const methodMap = {
        "POST": reviewPostHandler
    };
    await MethodRouter(req, res, methodMap);
}

interface reviewRequestBody {
    movieID: number;
    rating: number;
    description: string;
    isPublic: boolean;
}

// function validatePostBody(body: reviewRequestBody) {
//     if (!body.movieID) return "movieID is required";
//     if (!body.rating) return "rating is required";
//     if (!isNumeric(body.movieID)) return "The movieID has to be a number";
//     if (body.movieID <= 0) return "The movieID can be less then 0";
//     if (body.description) {
//         if (!lengthBetween(body.description, 16, 255)) return "The description length has to be between 16-255";
//     }
//     return;
// }

async function reviewPostHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await LoginRequired(req);

    // const error = validatePostBody(req.body);
    // if (error)
    //     throw new BadRequestError(error);
    const { movieID, rating, description, isPublic }: reviewRequestBody = req.body;
    await createNewReview(user!, movieID, rating, description, isPublic)
    return returnResponse(res, { message: "asd" })
}