import jwt from "jsonwebtoken"

export function createToken(id: string): string {

    const secret = process.env.SECRET
    if (!secret) throw new Error("SECRET must be provided in .env")

    return jwt.sign({id}, secret, {expiresIn: "2d"})
}
