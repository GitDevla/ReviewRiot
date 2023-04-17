import MethodRouter from '@/util/backend/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/backend/ApiResponses';
import { globalSearchByName } from '@/service/SearchService';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const methodMap = {
        "GET": searchGetHandler
    };
    await MethodRouter(req, res, methodMap);
}

async function searchGetHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { name } = req.query;
    let nameQuery = name as string;
    const resp = await globalSearchByName(nameQuery);
    return returnResponse(res, resp)
}
