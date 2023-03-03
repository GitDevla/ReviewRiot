import MethodRouter from '@/util/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/ApiResponses';
import LoginRequired from '@/util/LoginRequired';
import { listFeed } from '@/service/ReviewService';

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
    const user = await LoginRequired(req);

    const { page, max } = req.query;
    let pageId = parseInt(page as string);
    if (isNaN(pageId)) pageId = 0;
    let maxId = parseInt(max as string);
    if (isNaN(maxId)) maxId = 20;

    const feed = await listFeed(user!, pageId, maxId);
    return returnResponse(res, { feed: feed })
}
