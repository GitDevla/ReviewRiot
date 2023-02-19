import { createNewUserService } from '@/service/UserService';
import { returnResponse, throwValidationError } from '@/util/ApiResponses';
import { isEmptyString } from '@/util/Checks';
import MethodRouter from '@/util/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'

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
    if (isEmptyString(body.username)) return "The username cant be empty";
    if (isEmptyString(body.email)) return "The email cant be empty";
    if (isEmptyString(body.password)) return "The password cant be empty";
    return;
}

async function userPostHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let error = validateBody(req.body);
    if (error)
        return throwValidationError(res, error);

    let { username, password, email }: userRequestBody = req.body;
    await createNewUserService(username, email, password);

    return returnResponse(res, { message: `User ${username} created` })
}