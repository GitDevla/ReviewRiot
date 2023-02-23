import { checkAdminPermission } from '@/service/UserService';
import MethodRouter from '@/util/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/ApiResponses';
import LoginRequired from '@/util/LoginRequired';
import { BadRequestError, ForbiddenError } from '@/util/Errors';
import { isEmptyString, validateDate } from '@/util/Checks';
import { createNewMovie, listMovies } from '@/service/MovieService';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const methodMap = {
        "GET": movieGetHandler,
        "POST": moviePostHandler
    };
    await MethodRouter(req, res, methodMap);
}

interface movieRequestBody {
    name: string;
    date: string;
}

function validatePostBody(body: movieRequestBody) {
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
    if (!(await checkAdminPermission(user!))) throw new ForbiddenError();

    const error = validatePostBody(req.body);
    if (error)
        throw new BadRequestError(error);

    let { name, date } = req.body;

    date = new Date(date);
    await createNewMovie(name, date);
    return returnResponse(res, { message: "New movie Added" })
}

async function movieGetHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let page: number = req.body["page"] ?? 0;
    let max: number = req.body["max"] ?? 20;
    let order: string = req.body["order"] ?? "name";

    const movies = await listMovies(page, max, order);
    return returnResponse(res, { movies })
}
