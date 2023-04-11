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
    const { id, page, max } = req.query;

    let movieID = parseInt(id as string);
    if (isNaN(movieID)) throw new BadRequestError("A movieID-nek számnak kell lennie");
    let pageId = parseInt(page as string);
    if (isNaN(pageId)) pageId = 0;
    let maxId = parseInt(max as string);
    if (isNaN(maxId)) maxId = 20;


    const { movie, reviews } = await getMovieReviews(movieID, pageId, maxId);
    return returnResponse(res, { movie, reviews })
}
