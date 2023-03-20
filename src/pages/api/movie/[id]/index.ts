import MethodRouter from '@/util/backend/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/backend/ApiResponses';
import { getMovieReviews } from '@/service/MovieService';
import { BadRequestError } from '@/util/Errors';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const methodMap = {
        "GET": movieGetHandler
    };
    await MethodRouter(req, res, methodMap);
}

async function movieGetHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;
    let movieID = parseInt(id as string);
    if (isNaN(movieID)) throw new BadRequestError("A movieID-nek számnak kell lennie");

    const { movie, reviews } = await getMovieReviews(movieID);
    return returnResponse(res, { movie, reviews })
}
