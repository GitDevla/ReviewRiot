import { NextApiRequest, NextApiResponse } from "next";
import { returnError } from "./ApiResponses";
import { HTTPError, ServerError, UnknowMethodError } from "../Errors";

export default async (req: NextApiRequest, res: NextApiResponse, methodMap: any) => {
    const method = req.method as keyof typeof methodMap;

    const handler = methodMap[method];

    try {
        if (!handler)
            throw new UnknowMethodError(`Nincs ilyen metódus, elérhető metódusok: [${Object.keys(methodMap)}]`)
        return await handler(req = req, res = res);
    } catch (error) {
        if (error instanceof HTTPError)
            return returnError(res, error);
        console.error(error);
        returnError(res, new ServerError("Ismeretlen szerver hiba történt"));
        if (process.env.NODE_ENV == "development")
            throw error;
        else
            console.error(error);
    }
}