import { NextApiResponse } from "next";


export const throwValidationError = (res: NextApiResponse, err: string) => {
    res.status(400).json({ error: err });
}

export const throwUnknowMethod = (res: NextApiResponse) => {
    res.status(405).json({ error: "This method is not avaliable on this route" });
}

export const throwServerError = (res: NextApiResponse, err: string) => {
    res.status(500).json({ error: err });
}

export const returnResponse = (res: NextApiResponse, body: object) => {
    res.status(200).json(body);
}