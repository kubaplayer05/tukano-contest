"use client"

import React, {Dispatch, SetStateAction, useEffect, useRef} from "react";
import {useAtom} from "jotai";
import {currentNodeAtom, graphAtom, selectedActionAtom} from "@/atoms/canvasAtom";
import {Graph} from "@/lib/graph/graph";

interface GraphCanvasProps {
    setOpenDialog: Dispatch<SetStateAction<boolean>>
}

export default function GraphCanvas({setOpenDialog}: GraphCanvasProps) {

    const [graph, setGraph] = useAtom(graphAtom)
    const [selectedAction,] = useAtom(selectedActionAtom)
    const [, setCurrentNode] = useAtom(currentNodeAtom)
    const ref = useRef<HTMLCanvasElement>(null)

    useEffect(() => {

        const canvas = ref.current

        if (canvas) {
            canvas.width = 1200
            canvas.height = 700

            const context = canvas.getContext('2d')

            if (context) {
                graph.drawEdges(context)
                graph.drawNodes(context)
            }
        }
    }, [graph.nodes, graph.edges]);

    const onClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return

        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        switch (selectedAction) {
            case "AddNode":
                if (graph.clickedOnNode(x, y)) break;

                setCurrentNode({name: "", posX: x, posY: y})
                setOpenDialog(true)

                break
            case "DeleteNode":

                const nodeName = graph.clickedOnNode(x, y)

                if (nodeName) {
                    setGraph(prev => {

                        const nodes = prev.nodes.filter(node => node.name !== nodeName)
                        const edges = prev.edges.filter(edge => edge.from !== nodeName && edge.to !== nodeName)

                        return new Graph(nodes, edges)
                    })
                    setGraph(prev => {
                        const edges = prev.edges.map(edge => {
                            return {
                                ...edge,
                                isActive: false
                            }
                        })
                        return new Graph(prev.nodes, edges)
                    })
                }

                break
        }
    }

    return (
        <canvas ref={ref} onClick={onClick} className="w-full h-full"></canvas>
    )
}
