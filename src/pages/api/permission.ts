import MethodRouter from '@/util/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/ApiResponses';
import LoginRequired from '@/util/LoginRequired';
import { PermissionModel } from '@/model/PermissionModel';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const methodMap = {
        "GET": permissionGetHandler
    };
    await MethodRouter(req, res, methodMap);
}

async function permissionGetHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await LoginRequired(req);
    const level = await PermissionModel.getLevelFromID(user!.permissionID);
    return returnResponse(res, { level })
}