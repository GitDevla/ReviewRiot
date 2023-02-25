import { checkAdminPermission } from '@/service/UserService';
import MethodRouter from '@/util/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/ApiResponses';
import LoginRequired from '@/util/LoginRequired';
import { ForbiddenError } from '@/util/Errors';
import { createNewMovie, listMovies } from '@/service/MovieService';
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
