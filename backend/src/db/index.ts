import mongoose from "mongoose"

const dbUser = process.env.DB_USER || ""
const dbPassword = process.env.DB_PASSWORD || ""

mongoose.connect(`mongodb://${dbUser}:${dbPassword}@127.0.0.1:27017/`).then(() => {
    console.log("Connected to db")
}).catch((err) => {
    console.log("Error connecting to db: ", err)
})
