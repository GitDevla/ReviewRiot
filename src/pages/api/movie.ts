import { checkAdminPermission } from '@/service/UserService';
import MethodRouter from '@/util/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/ApiResponses';
import LoginRequired from '@/util/LoginRequired';
import { BadRequestError, ForbiddenError } from '@/util/Errors';
import { isEmptyString, validateDate } from '@/util/Checks';
import { createNewMovie } from '@/service/MovieService';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const methodMap = {
        "POST": moviePostHandler
    };
    await MethodRouter(req, res, methodMap);
}

interface movieRequestBody {
    name: string;
    date: string;
}

function validateBody(body: movieRequestBody) {
    if (isEmptyString(body.name)) return "The name cannot be empty";
    if (isEmptyString(body.date)) return "The date cannot be empty";
    if (!validateDate(body.date)) return "The date is not real";
    return;
}

async function moviePostHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await LoginRequired(req);
    if (!checkAdminPermission(user)) throw new ForbiddenError();

    let error = validateBody(req.body);
    if (error)
        throw new BadRequestError(error);

    let { name, date } = req.body;

    date = new Date(date);
    await createNewMovie(name, date);
    return returnResponse(res, { message: "New movie Added" })
}
