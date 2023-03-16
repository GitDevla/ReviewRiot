import MethodRouter from '@/util/backend/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import multiparty from 'multiparty';
import { changeDescription, changePassword, changeProfilePicture, changeUsername, checkPermission } from '@/service/UserService';
import LoginRequired from '@/util/backend/LoginRequired';
import { validatePassword, validateUsername } from '@/validator/userValidator';
import { PermissionLevel } from '@/util/PermissionLevels';
import { ForbiddenError } from '@/util/Errors';
import { updateMovieCoverPhoto, updateMovieName, updateMovieRelease } from '@/service/MovieService';
import { validateMovieName, validateMovieRelease } from '@/validator/movieValidator';


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
    var form = new multiparty.Form();

    form.parse(req, async function (err, fields, files) {
        const { name, release } = fields;
        if (name) {
            validateMovieName(name[0])
            await updateMovieName(movieID, name[0]);
        }
        if (release) {
            validateMovieRelease(release);
            await updateMovieRelease(movieID, release[0]);
        }

        if (files.file) {
            const image = files.file[0] as multiparty.File
            if (image.headers["content-type"].startsWith("image"))
                console.log();

            await updateMovieCoverPhoto(movieID, files.file[0].path);
        }
        return res.status(201).send("");
    });

}
