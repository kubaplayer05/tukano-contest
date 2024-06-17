import express from "express"
import {
    deleteGraphController,
    findShortestPathController, generateGraphFromUrlController,
    generateUrlFromGraphController,
    getAllGraphsController,
    saveGraphController
} from "../controllers/graphController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router()

router.post("/find-shortest-path", findShortestPathController)
router.post("/generate-url", generateUrlFromGraphController)
router.get("/get/from/:url", generateGraphFromUrlController)

router.use(authMiddleware)

router.post("/save", saveGraphController)
router.delete("/delete/:graphId", deleteGraphController)
router.get("/get/all", getAllGraphsController)

export default router
