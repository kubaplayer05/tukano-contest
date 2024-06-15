import {Request, Response} from "express"
import {Graph} from "../schemas/graphSchema";

export async function findShortestPathController(req: Request, res: Response) {

    const {nodes, edges, start, end} = req.body

    try {

        const graph = new Graph({nodes, edges})
        const value = graph.findShortestPath(start, end)

        return res.status(200).json({
            "distance": value,
        })

    } catch (err) {
        return res.status(400).json({
            "msg": (err as Error).message
        })
    }
}
