import mongoose, {Model} from "mongoose";

interface INode {
    name: string,
    posX: number,
    posY: number,
}

interface IEdge {
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

interface IGraphMethods {
    findShortestPath(start: string, end: string): number
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
    let visited = []

    this.nodes.forEach(node => {
        distances[node.name] = {
            value: node.name === start ? 0 : Infinity,
            prevNode: null,
        }
    })

    let queue = [start]

    while (queue.length) {

        const currentNode = queue.shift()
        if (!currentNode) break

        const currentDistance = distances[currentNode].value

        visited.push(currentNode)

        const edges = this.edges.filter(edge => edge.from === currentNode)

        edges.forEach(edge => {
            const updatedDistance = currentDistance + edge.weight
            const nextNode = edge.to

            if (!visited.includes(nextNode) && updatedDistance < distances[nextNode].value) {
                distances[nextNode].value = updatedDistance
                distances[nextNode].prevNode = currentNode
                queue.push(nextNode)
            }
        })
    }

    return distances[end].value
})

export const Graph = mongoose.model("Graph", graphSchema)
