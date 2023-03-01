import { checkAdminPermission } from '@/service/UserService';
import MethodRouter from '@/util/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/ApiResponses';
import LoginRequired from '@/util/LoginRequired';
import { ForbiddenError } from '@/util/Errors';
import { createMovie, listMovies } from '@/service/MovieService';
import { Validate } from '@/util/Validator';

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

function validatePostBody(body: any) {
    Validate(body.name).required("Name missing").notEmpty("The name cannot be empty");
    Validate(body.date).required("Date missing").date("The date is not real");
}

async function moviePostHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await LoginRequired(req);
    if (!(await checkAdminPermission(user!))) throw new ForbiddenError();

    validatePostBody(req.body);

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
