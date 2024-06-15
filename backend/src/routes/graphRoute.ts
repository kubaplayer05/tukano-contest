import express from "express"
import {findShortestPathController} from "../controllers/graphController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router()

router.post("/find-shortest-path", findShortestPathController)

router.use(authMiddleware)

router.post("/create", (req, res) => {
    return res.json({"msg": "ok"})
})

export default router
