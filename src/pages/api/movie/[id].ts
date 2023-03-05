import MethodRouter from '@/util/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/ApiResponses';
import { getMovieReviews } from '@/service/MovieService';

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

    const { movie, reviews } = await getMovieReviews(movieID);
    return returnResponse(res, { movie, reviews })
}
