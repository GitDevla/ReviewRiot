import { createNewUserService } from '@/service/UserService';
import { returnResponse, throwServerError, throwUnknowMethod, throwValidationError } from '@/util/ApiResponses';
import { isEmptyString } from '@/util/Checks';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        switch (req.method) {
            case "POST":
                return userPostHandler(req, res);

            default:
                return throwUnknowMethod(res);
        }
    } catch (error: any) {
        return throwServerError(res, error.message);
    }
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
    try {
        await createNewUserService(username, password, email);
    } catch (error: any) {
        return throwServerError(res, error.message);
    }
    return returnResponse(res, { message: `User ${username} created` })
}