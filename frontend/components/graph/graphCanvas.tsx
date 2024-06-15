"use client"

import React, {Dispatch, SetStateAction, useEffect, useRef} from "react";
import {useAtom} from "jotai";
import {currentNodeAtom, graphAtom, selectedActionAtom} from "@/atoms/canvasAtom";

interface GraphCanvasProps {
    setOpenDialog: Dispatch<SetStateAction<boolean>>
}

export default function GraphCanvas({setOpenDialog}: GraphCanvasProps) {

    const [graph,] = useAtom(graphAtom)
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

        switch (selectedAction) {
            case "AddNode":
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top

                setCurrentNode({name: "", posX: x, posY: y})
                setOpenDialog(true)

                break
        }
    }

    return (
        <canvas ref={ref} onClick={onClick} className="w-full h-full"></canvas>
    )
}
