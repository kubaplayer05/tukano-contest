import mongoose, {Model} from "mongoose";

interface IEdge {
    from: string,
    to: string,
    weight: number
}

interface IGraph {
    nodes: string[],
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

const edgeSchema = new mongoose.Schema<IEdge>({
    from: {type: String, required: true},
    to: {type: String, required: true},
    weight: {type: Number, required: true},
})

const graphSchema = new mongoose.Schema<IGraph, GraphModel, IGraphMethods>({
    nodes: {type: [String], required: true},
    edges: {type: [edgeSchema], required: true}
})

graphSchema.method("findShortestPath", function (start: string, end: string) {

    let distances: IDistances = {}
    let visited = []

    this.nodes.forEach(node => {
        distances[node] = {
            value: node === start ? 0 : Infinity,
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
