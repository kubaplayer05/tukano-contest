import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import {User} from "../schemas/userSchema";

declare global {
    namespace Express {
        interface Request {
            user: string
        }
    }
}

type JwtPayload = {
    id: string;
    [key: string]: any;
}

function isJwtPayload(object: any): object is JwtPayload {
    return typeof object === 'object' && 'id' in object;
}

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {

    try {
        const {token} = req.cookies

        if (!process.env.SECRET) {
            return res.status(500).json({
                "error": "The SECRET must be provided in .env"
            })
        }

        const decoded = jwt.verify(token, process.env.SECRET)

        if (isJwtPayload(decoded)) {
            const { id } = decoded;

            const result = await User.findById(id)

            if (!result) {
                return res.status(403).json({
                    error: "Wrong authorization token"
                })
            }

            req.user = result._id.toString()
            next()
        }

    } catch (err) {
        return res.status(401).json({
            "msg": "Request is not authorized"
        })
    }
}
