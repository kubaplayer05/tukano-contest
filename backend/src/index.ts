import express from "express"
import dotenv from "dotenv"
dotenv.config()
import "./db/index"

const app = express()
const port = 3000

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
})

