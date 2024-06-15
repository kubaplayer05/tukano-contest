export interface Node {
    name: string,
    posX: number,
    posY: number,
}

export interface Edge {
    from: string,
    to: string,
    weight: number
}

export interface EdgePosition {
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
}

export class Graph {
    public nodes: Node[];
    public edges: Edge[];

    constructor(nodes: Node[], edges: Edge[]) {
        this.nodes = nodes
        this.edges = edges
    }

    drawNodes(ctx: CanvasRenderingContext2D) {

        ctx.strokeStyle = "#F59E0B";
        ctx.lineWidth = 5

        this.nodes.forEach(node => {
            ctx.beginPath();
            ctx.arc(node.posX, node.posY, 25, 0, 2 * Math.PI);
            ctx.fillStyle = "#451A03"
            ctx.fill();
            ctx.stroke()

            ctx.fillStyle = "#FFF"
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.font = "16px Arial"
            ctx.fillText(node.name, node.posX, node.posY)

            ctx.closePath()
        })
    }

    drawEdges(ctx: CanvasRenderingContext2D) {

        ctx.strokeStyle = "#38BDF8"
        ctx.lineWidth = 2

        this.edges.forEach(edge => {

            const startNode = this.nodes.filter(node => node.name === edge.from)
            const endNode = this.nodes.filter(node => node.name === edge.to)

            const position: EdgePosition = {
                fromX: startNode[0].posX,
                fromY: startNode[0].posY,
                toX: endNode[0].posX,
                toY: endNode[0].posY
            }

            ctx.beginPath();
            ctx.moveTo(position.fromX, position.fromY);
            ctx.lineTo(position.toX, position.toY);
            ctx.stroke();

            const textPosX = (position.fromX + position.toX) / 2
            const textPosY = (position.fromY + position.toY) / 2 - 10

            ctx.fillStyle = "#FFF"
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.font = "16px Arial"
            ctx.fillText(edge.weight.toString(), textPosX, textPosY)

            ctx.closePath()
        })
    }
}
