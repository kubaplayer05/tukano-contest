"use client"

import ActionDialog from "@/components/dialogs/actionDialog";
import {Dispatch, SetStateAction} from "react";
import {useAtom} from "jotai";
import {graphAtom, selectedActionAtom} from "@/atoms/canvasAtom";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {SubmitHandler, useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {saveGraphHandler} from "@/lib/api/saveGraph";
import {useToast} from "@/components/ui/use-toast";

interface SaveGraphDialogProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

interface Inputs {
    name: string
}

export default function SaveGraphDialog({setOpen, open}: SaveGraphDialogProps) {

    const [graph,] = useAtom(graphAtom)
    const [selectedAction, setSelectedAction] = useAtom(selectedActionAtom)
    const {register, handleSubmit} = useForm<Inputs>()
    const {toast} = useToast()

    const mutation = useMutation({
        mutationFn: saveGraphHandler,
        onSuccess: () => {
            setSelectedAction(null)
            setOpen(false)
            toast({
                title: "Graph saved successfully",
            })
        }
    })

    const content = <>
        <div className="grid w-full items-center gap-3 py-2">
            <Label htmlFor="node-name">Graph Name</Label>
            <Input className="text-white border-4 border-teal-600 bg-teal-800 placeholder:text-gray-300"
                   id="graph-name"
                   placeholder="Enter name for your Graph" {...register("name", {required: true})}/>
        </div>
    </>

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const saveGraphData = {...data, nodes: graph.nodes, edges: graph.edges}

        console.log(saveGraphData)

        mutation.mutate(saveGraphData)
    }

    return (
        <ActionDialog open={open && selectedAction === "SaveGraph"} setOpen={setOpen} content={content}
                      onSubmit={handleSubmit(onSubmit)} title="Save your Graph" submitBtnText="Save"/>
    )
}
