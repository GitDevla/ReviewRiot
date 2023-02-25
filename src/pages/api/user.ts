import { createNewUser } from '@/service/UserService';
import MethodRouter from '@/util/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { returnResponse } from '@/util/ApiResponses';
import { Validate } from '@/util/Validator';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const methodMap = {
        "POST": userPostHandler
    };
    await MethodRouter(req, res, methodMap);
}


function validateBody(body: any) {
    Validate(body.username)
        .required("Username required")
        .notEmpty("The username cannot be empty")
        .lengthBetween(6, 32, "The username length has to be between 6 - 32")
    Validate(body.email)
        .required("Email required")
        .email("The email provided is not an email")
    Validate(body.password)
        .required("Password required")
        .notEmpty("The password cannot be empty")
        .lengthBetween(8, 55, "The password length has to be between 8 - 55")
}

async function userPostHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    validateBody(req.body);

    const { username, password, email } = req.body;
    await createNewUser(username, email, password);


    return returnResponse(res, { message: `User ${username} created` })
}