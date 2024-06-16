import {Request, Response} from "express"
import {User} from "../schemas/userSchema";
import {createToken} from "../utils/jwt";
import {comparePasswords, hashPassword} from "../utils/bcrypt";

export async function registerController(req: Request, res: Response) {

    const {username, password} = req.body

    if (!username) {
        return res.status(400).json({
            "msg": "Username not provided"
        })
    }

    if (!password) {
        return res.status(400).json({
            "msg": "Password not provided"
        })
    }

    try {

        const hash = await hashPassword(password)
        const user = await User.create({username, password: hash})

        const token = createToken(user._id.toString())

        res.cookie("token", token, {
            httpOnly: true
        })

        return res.status(200).json({
            "user": user
        })


    } catch (err) {
        return res.status(400).json({
            "msg": (err as Error).message
        })
    }
}

export async function loginController(req: Request, res: Response) {

    const {username, password} = req.body

    try {

        const user = await User.findOne({username})

        if (!user) throw new Error(`User with username: ${username}, not found`)

        await comparePasswords(password, user.password)

        const token = createToken(user._id.toString())

        res.cookie("token", token, {
            httpOnly: true
        })

        res.cookie("user", JSON.stringify({username: user.username}), {httpOnly: false})

        return res.status(200).json({
            "user": user
        })

    } catch (err) {
        return res.status(400).json({
            "msg": (err as Error).message
        })
    }
}
