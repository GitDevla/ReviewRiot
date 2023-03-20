import multiparty from 'multiparty';
import { BadRequestError } from '../Errors';

export const FormParse = async (req: any): Promise<{ fields: any, files: any }> => {
    return new Promise(
        (resolve, reject) => {
            var form = new multiparty.Form();
            form.parse(req, function (err, fields, files) {
                if (err) reject(new BadRequestError("Ennek a metódusnak egy formnak kell lennie"));
                resolve({ fields, files });
            });
        }
    )

}