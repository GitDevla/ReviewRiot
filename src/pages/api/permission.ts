import MethodRouter from '@/util/backend/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/backend/ApiResponses';
import LoginRequired from '@/util/backend/LoginRequired';
import { PermissionModel } from '@/model/PermissionModel';
import { validateUserPermUpdate } from '@/validator/userValidator';
import { changeUserPermission, checkPermission } from '@/service/UserService';
import { PermissionLevel } from '@/util/PermissionLevels';
import { ForbiddenError } from '@/util/Errors';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const methodMap = {
        "GET": permissionGetHandler,
        "PUT": permissionPutHandler
    };
    await MethodRouter(req, res, methodMap);
}

async function permissionGetHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { all } = req.query;
    if (all) {
        const perms = await PermissionModel.list();
        return returnResponse(res, { perms })
    }

    const user = await LoginRequired(req);
    const level = (await PermissionModel.getLevelFromID(user!.permissionID))?.level;
    return returnResponse(res, { level })
}

async function permissionPutHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await LoginRequired(req);
    if (!(await checkPermission(user!, PermissionLevel.admin))) throw new ForbiddenError();
    validateUserPermUpdate(req.body);
    const { whom, permID } = req.body;
    await changeUserPermission(whom, permID);
    return returnResponse(res, { message: "Sikeres válzotatás" })
}