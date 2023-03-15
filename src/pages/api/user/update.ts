import MethodRouter from '@/util/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import multiparty from 'multiparty';
import { changeDescription, changePassword, changeProfilePicture, changeUsername } from '@/service/UserService';
import LoginRequired from '@/util/LoginRequired';
import { validatePassword, validateUsername } from '@/validator/userValidator';


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
        "PUT": userUpdateHandler
    };
    await MethodRouter(req, res, methodMap);
}



async function userUpdateHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await LoginRequired(req);

    var form = new multiparty.Form();

    form.parse(req, async function (err, fields, files) {
        const { username, password, description } = fields;
        if (username) {
            validateUsername(username[0])
            await changeUsername(user!, username[0]);
        }
        if (description) {
            await changeDescription(user!, description[0]);
        }
        if (password) {
            validatePassword(password[0])
            await changePassword(user!, password[0]);
        }
        if (files.file) {
            const image = files.file[0] as multiparty.File
            if (image.headers["content-type"].startsWith("image"))
                await changeProfilePicture(user!, files.file[0].path);
        }
        return res.status(201).send("");
    });

}
