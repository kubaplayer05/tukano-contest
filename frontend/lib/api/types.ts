import {Edge, Node} from "@/lib/graph/graph"

export interface AuthParams {
    username: string,
    password: string
}

export interface SaveGraphParams {
    name: string
    nodes: Node[],
    edges: Edge[]
}
