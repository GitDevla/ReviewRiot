import MethodRouter from '@/util/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import multiparty from 'multiparty';
import { changeProfilePicture } from '@/service/UserService';
import LoginRequired from '@/util/LoginRequired';


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
        if (files.file[0]) {
            const image = files.file[0] as multiparty.File
            if (image.headers["content-type"].startsWith("image"))
                await changeProfilePicture(user!, files.file[0].path);
        }
        return res.status(201).send("");
    });

}
