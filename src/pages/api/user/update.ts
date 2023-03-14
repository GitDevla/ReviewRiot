import MethodRouter from '@/util/MethodRouter';
import type { NextApiRequest, NextApiResponse } from 'next'
import { FilesystemModel } from '@/model/FilesystemModel';
import multiparty from 'multiparty';


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
    var form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {
        console.log(fields);

        FilesystemModel.save(files.file[0].path, "user")
    });
    return res.status(201).send("");

}
