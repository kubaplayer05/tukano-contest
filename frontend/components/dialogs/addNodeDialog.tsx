"use client"

import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Dispatch, SetStateAction} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAtom} from "jotai";
import {currentNodeAtom, graphAtom, selectedActionAtom} from "@/atoms/canvasAtom";
import {Graph, Node} from "@/lib/graph/graph";

interface AddNodeDialogProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

interface Inputs {
    name: string
}

export default function AddNodeDialog({open, setOpen}: AddNodeDialogProps) {

    const [currentNode,] = useAtom(currentNodeAtom)
    const [, setGraph] = useAtom(graphAtom)
    const [selectedAction, ] = useAtom(selectedActionAtom)
    const {register, handleSubmit} = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {

        if (!currentNode) return

        setGraph(prevState => {
            const node: Node = {name: data.name, posX: currentNode.posX, posY: currentNode.posY}
            const nodes = [...prevState.nodes, node]
            return new Graph(nodes, prevState.edges)
        })

        setOpen(false)
    }

    return (
        <Dialog open={open && selectedAction === "AddNode"} onOpenChange={setOpen}>
            <DialogContent className="bg-teal-900 text-white border-4 border-teal-950">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader className="border-b-2 border-white pb-4">
                        <DialogTitle>Add new Node to your Graph</DialogTitle>
                    </DialogHeader>
                    <div className="grid w-full items-center gap-3 py-2">
                        <Label htmlFor="node-name">Node name</Label>
                        <Input className="text-white border-4 border-teal-600 bg-teal-800 placeholder:text-gray-300"
                               id="node-name"
                               placeholder="Enter name for your node" {...register("name", {required: true})}/>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary"
                                    className="bg-red-700 border-2 border-red-900 text-white hover:bg-red-800">Close</Button>
                        </DialogClose>
                        <Button type="submit"
                                className="bg-teal-500 hover:bg-teal-600 border-2 border-teal-800">Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
