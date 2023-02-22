import { createNewUser } from '@/service/UserService';
import { BadRequestError } from '@/util/Errors';
import { isEmptyString, lengthBetween, validateEmail } from '@/util/Checks';
import MethodRouter from '@/util/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/ApiResponses';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const methodMap = {
        "POST": userPostHandler
    };
    await MethodRouter(req, res, methodMap);
}

interface userRequestBody {
    username: string;
    password: string;
    email: string;
}

function validateBody(body: userRequestBody) {
    if (isEmptyString(body.username)) return "The username cannot be empty";
    if (isEmptyString(body.email)) return "The email cannot be empty";
    if (isEmptyString(body.password)) return "The password cannot be empty";
    if (!lengthBetween(body.username, 1, 32)) return "The username length has to be between 1 - 32";
    if (!lengthBetween(body.password, 8, 55)) return "The password length has to be between 1 - 32";
    if (!validateEmail(body.email)) return "The email provided is not an email";
    return;
}

async function userPostHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const error = validateBody(req.body);
    if (error)
        throw new BadRequestError(error);

    const { username, password, email }: userRequestBody = req.body;
    await createNewUser(username, email, password);


    return returnResponse(res, { message: `User ${username} created` })
}