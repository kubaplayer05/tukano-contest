import bcrypt from "bcrypt"

export async function hashPassword(password: string) {

    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

export async function comparePasswords(password: string, hash: string) {

    const result = await bcrypt.compare(password, hash)
    if(!result) throw new Error("Wrong password")

    return result
}
