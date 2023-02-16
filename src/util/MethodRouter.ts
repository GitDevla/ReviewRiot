import { NextApiRequest, NextApiResponse } from "next";
import { throwServerError, throwUnknowMethod } from "./ApiResponses";

export default async (req: NextApiRequest, res: NextApiResponse, methodMap: any) => {
    const method = req.method as keyof typeof methodMap;

    const handler = methodMap[method] || throwUnknowMethod
    try {
        return await handler(req = req, res = res);
    } catch (error: any) {
        return throwServerError(res, error.message);
    }
}