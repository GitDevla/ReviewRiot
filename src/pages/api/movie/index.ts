import { checkPermission } from '@/service/UserService';
import MethodRouter from '@/util/backend/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/backend/ApiResponses';
import LoginRequired from '@/util/backend/LoginRequired';
import { ForbiddenError } from '@/util/Errors';
import { createMovie, listMovies } from '@/service/MovieService';
import { validateMovieCreate } from '@/validator/movieValidator';
import { PermissionLevel } from '@/util/PermissionLevels';


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

async function moviePostHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await LoginRequired(req);
    if (!(await checkPermission(user!, PermissionLevel.admin))) throw new ForbiddenError();
    validateMovieCreate(req.body);
    let { name, date } = req.body;

    date = new Date(date);
    await createMovie(name, date);
    return returnResponse(res, { message: "New movie Added" })
}

async function movieGetHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { page, max, order } = req.query;
    let pageId = parseInt(page as string);
    if (isNaN(pageId)) pageId = 0;
    let maxId = parseInt(max as string);
    if (isNaN(maxId)) maxId = 20;

    let orderBy = order as string ?? "name";
    const movies = await listMovies(pageId, maxId, orderBy);

    return returnResponse(res, { movies })
}
