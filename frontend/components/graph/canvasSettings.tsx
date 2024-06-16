"use client"

import {useAtom} from "jotai";
import {graphAtom, SelectedAction, selectedActionAtom, shortestPathValueAtom} from "@/atoms/canvasAtom";
import {Button} from "@/components/ui/button";
import {Dispatch, SetStateAction} from "react";
import {authAtom} from "@/atoms/authAtom";
import {Separator} from "@/components/ui/separator";
import FindShortestPathForm from "@/components/forms/findShortestPathForm";
import {Graph} from "@/lib/graph/graph";

interface CanvasSettingsProps {
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function CanvasSettings({setOpen}: CanvasSettingsProps) {

    const [selectedAction, setSelectedAction] = useAtom(selectedActionAtom)
    const [, setShortestPathValue] = useAtom(shortestPathValueAtom)
    const [username,] = useAtom(authAtom)
    const [, setGraph] = useAtom(graphAtom)

    const clearCanvas = () => {
        setGraph(new Graph([], []))
    }

    const resetActionAndEdges = () => {
        setShortestPathValue(null)
        setSelectedAction(null)

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

    return (
        <div className="h-[700px] min-w-[300px] bg-zinc-800 shadow rounded-lg px-10 py-6">
            <h2 className="text-center text-xl uppercase">Select Action</h2>
            <div className="flex flex-col items-center justify-start gap-3 py-10">
                <div className="grid grid-cols-2 gap-2">
                    <Button onClick={() => {
                        setSelectedAction(SelectedAction.AddNode)
                    }}
                            className={`w-full transition bg-zinc-600 hover:bg-teal-700 hover:opacity-80 
                        ${selectedAction === "AddNode" ? "bg-teal-700" : ""}`}>
                        Add new Node
                    </Button>
                    <Button onClick={() => {
                        setSelectedAction(SelectedAction.DeleteNode)
                    }}
                            className={`w-full transition bg-zinc-600 hover:bg-teal-700 hover:opacity-80 
                        ${selectedAction === "DeleteNode" ? "bg-teal-700" : ""}`}>
                        Delete Node
                    </Button>
                </div>
                <Button onClick={() => {
                    setSelectedAction(SelectedAction.AddEdge)
                    setOpen(true)
                }}
                        className={`w-full transition bg-zinc-600 hover:bg-teal-700 hover:opacity-80 
                        ${selectedAction === "AddEdge" ? "bg-teal-700" : ""}`}>
                    Add new Edge
                </Button>
                <Button disabled={!username} onClick={() => {
                    setSelectedAction(SelectedAction.SaveGraph)
                    setOpen(true)
                }}
                        className={`w-full transition bg-zinc-600 disabled:opacity-70 hover:bg-teal-700 hover:opacity-80 
                        ${selectedAction === "SaveGraph" ? "bg-teal-700" : ""}`}>
                    Save graph
                </Button>
            </div>
            <Separator/>
            <h2 className="text-center text-xl uppercase pt-5">Find shortest path</h2>
            <FindShortestPathForm/>
            <div className="flex w-full justify-between pt-2">
                <p onClick={clearCanvas} className="cursor-pointer text-blue-400 font-bold hover:underline">Clear
                    map</p>
                <p onClick={resetActionAndEdges}
                   className="cursor-pointer text-blue-400 font-bold hover:underline">Reset</p>
            </div>
        </div>
    )
}
