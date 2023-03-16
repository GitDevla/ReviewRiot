import { NextApiResponse } from "next";
import { HTTPError } from "../Errors";


export const returnError = (res: NextApiResponse, body: HTTPError) => {
    res.status(body.status).json({ error: body.message });
}

export const returnResponse = (res: NextApiResponse, body: object) => {
    res.status(200).json(body);
}