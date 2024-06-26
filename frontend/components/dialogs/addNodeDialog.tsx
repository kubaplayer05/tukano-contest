"use client"

import {Dispatch, SetStateAction} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAtom} from "jotai";
import {currentNodeAtom, graphAtom, selectedActionAtom} from "@/atoms/canvasAtom";
import {Graph, Node} from "@/lib/graph/graph";
import ActionDialog from "@/components/dialogs/actionDialog";
import {ErrorMessage} from "@hookform/error-message";

interface AddNodeDialogProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

interface Inputs {
    name: string
}

export default function AddNodeDialog({open, setOpen}: AddNodeDialogProps) {

    const [currentNode,] = useAtom(currentNodeAtom)
    const [graph, setGraph] = useAtom(graphAtom)
    const [selectedAction, setSelectedAction] = useAtom(selectedActionAtom)
    const {register, handleSubmit, formState, setError} = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {

        if (!currentNode) return;

        if (graph.nodes.find(node => node.name === data.name)) {
            return setError('name', {type: "custom", message: "Node names cannot be repeated"})
        }

        setGraph(prevState => {
            const node: Node = {name: data.name, posX: currentNode.posX, posY: currentNode.posY}
            const nodes = [...prevState.nodes, node]
            return new Graph(nodes, prevState.edges)
        })

        setSelectedAction(null)
        setOpen(false)
    }

    const content = <>
        <div className="grid w-full items-center gap-3 py-4">
            <Label htmlFor="node-name">Node name</Label>
            <Input className="text-white border-4 border-teal-600 bg-teal-800 placeholder:text-gray-300"
                   id="node-name"
                   placeholder="Enter name for your node" {...register("name", {required: true})}/>
        </div>
        <ErrorMessage errors={formState.errors} name="name" render={({message}) => {
            return <p className="font-semibold text-red-700">{message}</p>
        }}/>
    </>

    return (
        <ActionDialog open={open && selectedAction === "AddNode"} setOpen={setOpen} content={content}
                      onSubmit={handleSubmit(onSubmit)}
                      title="Add new Node to your Graph"/>
    )
}
