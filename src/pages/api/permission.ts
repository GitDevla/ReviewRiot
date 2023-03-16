import MethodRouter from '@/util/backend/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/backend/ApiResponses';
import LoginRequired from '@/util/backend/LoginRequired';
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