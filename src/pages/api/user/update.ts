import MethodRouter from '@/util/backend/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { changeDescription, changePassword, changeProfilePicture, changeUsername } from '@/service/UserService';
import LoginRequired from '@/util/backend/LoginRequired';
import { validatePassword, validateUsername, validateUserProfilePicture } from '@/validator/userValidator';
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
        "PUT": userUpdateHandler
    };
    await MethodRouter(req, res, methodMap);
}


async function userUpdateHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await LoginRequired(req);
    const { fields, files } = await FormParse(req);

    const { username, password, description } = fields;
    if (username) validateUsername(username[0]);
    if (password) validatePassword(password[0]);
    if (files.file) validateUserProfilePicture(files.file[0]);

    let tasks = [];
    if (username) tasks.push(changeUsername(user!, username[0]));
    if (description) tasks.push(changeDescription(user!, description[0]));
    if (password) tasks.push(changePassword(user!, password[0]));
    if (files.file) tasks.push(changeProfilePicture(user!, files.file[0].path));

    const succesful = (await Promise.allSettled(tasks)).filter(i => i.status == "fulfilled");
    return returnResponse(res, { message: succesful.length + " attribútum változtatva" })
}
