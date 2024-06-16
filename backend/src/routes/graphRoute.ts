import express from "express"
import {findShortestPathController, getAllGraphsController, saveGraphController} from "../controllers/graphController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router()

router.post("/find-shortest-path", findShortestPathController)

router.use(authMiddleware)

router.post("/save", saveGraphController)
router.get("/get/all", getAllGraphsController)

export default router
