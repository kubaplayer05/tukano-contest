"use client"

import {useAtom} from "jotai";
import {SelectedAction, selectedActionAtom} from "@/atoms/canvasAtom";
import {Button} from "@/components/ui/button";
import {Dispatch, SetStateAction} from "react";
import {authAtom} from "@/atoms/authAtom";

interface CanvasSettingsProps {
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function CanvasSettings({setOpen}: CanvasSettingsProps) {

    const [selectedAction, setSelectedAction] = useAtom(selectedActionAtom)
    const [username,] = useAtom(authAtom)

    return (
        <div className="h-[700px] w-[300px] bg-zinc-800 shadow rounded-lg px-10 py-6">
            <h2 className="text-center text-xl uppercase">Select Action</h2>
            <div className="flex flex-col items-center justify-start gap-3 py-10">
                <Button onClick={() => {
                    setSelectedAction(SelectedAction.AddNode)
                }}
                        className={`w-full transition bg-zinc-600 hover:bg-teal-700 hover:opacity-80 
                        ${selectedAction === "AddNode" ? "bg-teal-700" : ""}`}>
                    Add new Node
                </Button>
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
        </div>
    )
}
