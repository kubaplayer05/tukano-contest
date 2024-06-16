import mongoose, {Model} from "mongoose";
import PriorityQueue from "priorityqueuejs"

export interface INode {
    name: string,
    posX: number,
    posY: number,
}

export interface IEdge {
    from: string,
    to: string,
    weight: number
}

interface IGraph {
    name?: string,
    createdAt?: string,
    nodes: INode[],
    edges: IEdge[]
}

interface IDistances {
    [key: string]: {
        value: number,
        prevNode: null | string
    }
}

interface FindShortestPathResponse {
    value: number,
    routes: string[],
    distances: IDistances
}

interface IGraphMethods {
    findShortestPath(start: string, end: string): FindShortestPathResponse
}

type GraphModel = Model<IGraph, {}, IGraphMethods>

const nodeSchema = new mongoose.Schema<INode>({
    name: {type: String, required: true},
    posX: {type: Number, required: true},
    posY: {type: Number, required: true}
})

const edgeSchema = new mongoose.Schema<IEdge>({
    from: {type: String, required: true},
    to: {type: String, required: true},
    weight: {type: Number, required: true},
})

const graphSchema = new mongoose.Schema<IGraph, GraphModel, IGraphMethods>({
    name: {type: String},
    createdAt: {type: Date, default: new Date()},
    nodes: {type: [nodeSchema], required: true},
    edges: {type: [edgeSchema], required: true}
})

graphSchema.method("findShortestPath", function (start: string, end: string) {

    let distances: IDistances = {}
    let visited = new Set<string>();

    this.nodes.forEach(node => {
        distances[node.name] = {
            value: node.name === start ? 0 : Infinity,
            prevNode: null,
        }
    })

    let queue = new PriorityQueue((a: string, b: string) => distances[a].value - distances[b].value);
    queue.enq(start);

    while (!queue.isEmpty()) {
        const currentNode = queue.deq();

        if (visited.has(currentNode)) continue;
        visited.add(currentNode);

        const currentDistance = distances[currentNode].value;

        const edges = this.edges.filter(edge => edge.from === currentNode);

        edges.forEach(edge => {
            const updatedDistance = currentDistance + edge.weight;
            const nextNode = edge.to;

            if (updatedDistance < distances[nextNode].value) {
                distances[nextNode].value = updatedDistance;
                distances[nextNode].prevNode = currentNode;
                queue.enq(nextNode);
            }
        })
    }

    let currentNode: string | null = end;
    let response: FindShortestPathResponse = {
        value: distances[end].value,
        distances: distances,
        routes: [],
    }

    while (currentNode) {
        response.routes.unshift(currentNode);
        currentNode = distances[currentNode].prevNode;
    }

    return response;
})

export const Graph = mongoose.model("Graph", graphSchema)
