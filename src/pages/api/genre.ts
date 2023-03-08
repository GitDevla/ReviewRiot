import MethodRouter from '@/util/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/ApiResponses';
import { listGenres } from '@/service/GenreService';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const methodMap = {
        "GET": feedGetHandler
    };
    await MethodRouter(req, res, methodMap);
}

async function feedGetHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const genres = await listGenres();
    return returnResponse(res, { genres })
}
