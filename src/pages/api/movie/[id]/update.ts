import MethodRouter from '@/util/backend/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { checkPermission } from '@/service/UserService';
import LoginRequired from '@/util/backend/LoginRequired';
import { PermissionLevel } from '@/util/PermissionLevels';
import { BadRequestError, ForbiddenError } from '@/util/Errors';
import { updateMovieCoverPhoto, updateMovieGenres, updateMovieName, updateMovieRelease } from '@/service/MovieService';
import { validateMovieCoverPhoto, validateMovieName, validateMovieRelease } from '@/validator/movieValidator';
import { FormParse } from '@/util/backend/FormParse';
import { returnResponse } from '@/util/backend/ApiResponses';

export const config = {
    api: {
        bodyParser: false
    }
};

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const methodMap = {
        "PUT": movieUpdateHandler
    };
    await MethodRouter(req, res, methodMap);
}

async function movieUpdateHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await LoginRequired(req);
    if (!(await checkPermission(user!, PermissionLevel.admin))) throw new ForbiddenError();

    const { id } = req.query;
    const movieID = parseInt(id as string);
    if (isNaN(movieID)) throw new BadRequestError("A movieID-nek számnak kell lennie");

    const { fields, files } = await FormParse(req);
    const { name, release, genres } = fields;

    if (name) validateMovieName(name[0])
    if (release) validateMovieRelease(release);
    if (files.file) validateMovieCoverPhoto(files.file[0])

    if (name) await updateMovieName(movieID, name[0]);
    if (release) await updateMovieRelease(movieID, release[0]);
    if (genres) {
        const numbers: number[] = genres.map((i: string) => parseInt(i));
        const unique = [...new Set(numbers)];
        await updateMovieGenres(movieID, unique);
    }
    if (files.file) await updateMovieCoverPhoto(movieID, files.file[0].path);

    return returnResponse(res, { message: "Jó" })

}
