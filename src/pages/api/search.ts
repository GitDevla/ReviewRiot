import MethodRouter from '@/util/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/ApiResponses';
import Database from '@/util/Database';

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
    nameQuery = "%" + nameQuery + "%";
    const resp = await Database.query("SELECT id,name,picture_path as picture,'user' as type from `user` where name like ? UNION SELECT id,name,image_path,'movie' from `movie` where name like ?;", nameQuery, nameQuery);
    return returnResponse(res, resp)
}