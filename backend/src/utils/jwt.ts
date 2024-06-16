import jwt from "jsonwebtoken"
import {IEdge, INode} from "../schemas/graphSchema";

type DecodedGraph = {
    nodes: INode[],
    edges: IEdge[],
    [key: string]: any
}

function isDecodedGraph(object: any): object is DecodedGraph {
    return typeof object === 'object' && 'nodes' in object && 'edges' in object;
}

export function createToken(id: string): string {

    const secret = process.env.SECRET
    if (!secret) throw new Error("SECRET must be provided in .env")

    return jwt.sign({id}, secret, {expiresIn: "2d"})
}

export function createUrlFromGraph(edges: IEdge[], nodes: INode[]) {

    const secret = process.env.SECRET
    if (!secret) throw new Error("SECRET must be provided in .env")

    return jwt.sign({edges, nodes}, secret)
}

export function getGraphFromUrl(url: string) {

    const secret = process.env.SECRET
    if (!secret) throw new Error("SECRET must be provided in .env")

    const decoded = jwt.verify(url, secret)

    if (isDecodedGraph(decoded)) {
        return decoded
    }

    return null
}
