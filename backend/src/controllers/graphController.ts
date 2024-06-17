import {Request, Response} from "express"
import {Graph} from "../schemas/graphSchema";
import {User} from "../schemas/userSchema";
import {createUrlFromGraph, getGraphFromUrl} from "../utils/jwt";

export async function findShortestPathController(req: Request, res: Response) {

    const {nodes, edges, start, end} = req.body

    try {

        const graph = new Graph({nodes, edges})
        const value = graph.findShortestPath(start, end)

        return res.status(200).json({
            ...value
        })

    } catch (err) {
        console.log(err)

        return res.status(400).json({
            "msg": (err as Error).message
        })
    }
}

export async function saveGraphController(req: Request, res: Response) {

    const {edges, nodes, name} = req.body
    const id = req.user

    try {

        const graph = await Graph.create({name, nodes, edges})
        await User.findByIdAndUpdate(id, {
            $push: {graphs: graph._id}
        })

        return res.status(200).json({
            "msg": "Graph saved successfully",
            "graph": graph
        })

    } catch (err) {
        return res.status(400).json({
            "msg": (err as Error).message
        })
    }
}

export async function getAllGraphsController(req: Request, res: Response) {
    const id = req.user

    try {
        const user = await User.findById(id).populate("graphs")

        if (!user) throw new Error("User not found!")

        return res.status(200).json({
            "graphs": user.graphs
        })

    } catch (err) {
        return res.status(400).json({
            "msg": (err as Error).message
        })
    }


}

export async function deleteGraphController(req: Request, res: Response) {

    const {graphId} = req.params
    const id = req.user

    try {
        await User.findByIdAndUpdate(id, {
            $pull: {graphs: graphId}
        })

        await Graph.findByIdAndDelete(graphId)

        return res.status(200).json({
            "msg": "Graph deleted successfully"
        })

    } catch (err) {
        return res.status(400).json({
            "msg": (err as Error).message
        })
    }
}

export async function generateUrlFromGraphController(req: Request, res: Response) {

    const {edges, nodes} = req.body

    try {
        const url = createUrlFromGraph(edges, nodes)

        return res.status(200).json({
            "url": url
        })

    } catch (err) {
        return res.status(400).json({
            "msg": (err as Error).message
        })
    }
}

export async function generateGraphFromUrlController(req: Request, res: Response) {

    const {url} = req.params

    try {

        const graph = getGraphFromUrl(url)

        if (!graph) throw new Error("Could not decode url to receive graph structure")

        return res.status(200).json({
            "graph": graph
        })

    } catch (err) {
        return res.status(400).json({
            "msg": (err as Error).message
        })
    }
}
