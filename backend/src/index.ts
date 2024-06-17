import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute";
import graphRoute from "./routes/graphRoute";
import "./db/index"

const app = express()
const port = 5000

app.use(cors({credentials: true, origin: "http://localhost:3000"}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoute)
app.use("/api/graph", graphRoute)

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
})

