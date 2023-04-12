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
    console.log({ fields, files });

    if (username) validateUsername(username[0]);
    if (password) validatePassword(password[0]);
    if (files.file) validateUserProfilePicture(files.file[0]);


    if (username) await changeUsername(user!, username[0]);
    if (description) await changeDescription(user!, description[0]);
    if (password) await changePassword(user!, password[0]);
    if (files.file) await changeProfilePicture(user!, files.file[0].path);

    return returnResponse(res, { message: "Sikeres attribútum változtatva" })
}
