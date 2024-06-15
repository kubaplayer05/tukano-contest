"use client"

import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Dispatch, SetStateAction} from "react";
import {useAtom} from "jotai";
import {graphAtom, selectedActionAtom} from "@/atoms/canvasAtom";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Edge, Graph} from "@/lib/graph/graph";

interface AddEdgeDialogProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

interface Inputs {
    from: string,
    to: string,
    weight: number
}

export default function AddEdgeDialog({open, setOpen}: AddEdgeDialogProps) {

    const [selectedAction,] = useAtom(selectedActionAtom)
    const [graph, setGraph] = useAtom(graphAtom)
    const {register, handleSubmit, control} = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const edge: Edge = {...data}

        setGraph(prev => {
            const edges = [...prev.edges, edge]
            return new Graph(prev.nodes, edges)
        })

        setOpen(false)
    }

    return (
        <Dialog open={open && selectedAction === "AddEdge"} onOpenChange={setOpen}>
            <DialogContent className="bg-teal-900 text-white border-4 border-teal-950">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader className="border-b-2 border-white pb-4">
                        <DialogTitle>Add new Node to your Graph</DialogTitle>
                    </DialogHeader>
                    <div className="grid w-full items-center gap-3 py-2">
                        <Label htmlFor="edge-from">Edge from Node:</Label>
                        <Controller control={control} rules={{required: true}} render={({field}) => {
                            return (<Select onValueChange={field.onChange} {...field}>
                                <SelectTrigger id="edge-from"
                                               className="w-full text-white border-4 border-teal-600 bg-teal-800 placeholder:text-gray-300">
                                    <SelectValue placeholder="Select a starting Node"/>
                                </SelectTrigger>
                                <SelectContent className="bg-teal-700 text-white border-2 border-teal-800">
                                    {graph.nodes.map((node, i) => {
                                        return (
                                            <SelectItem className="!hover:bg-teal-600"
                                                        key={i} value={node.name}>{node.name}</SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>)
                        }} name="from"/>
                    </div>
                    <div className="grid w-full items-center gap-3 py-2">
                        <Label htmlFor="edge-to">Edge to Node:</Label>
                        <Controller control={control} rules={{required: true}} render={({field}) => {
                            return (<Select onValueChange={field.onChange} {...field}>
                                <SelectTrigger id="edge-to"
                                               className="w-full text-white border-4 border-teal-600 bg-teal-800 placeholder:text-gray-300">
                                    <SelectValue placeholder="Select a starting Node"/>
                                </SelectTrigger>
                                <SelectContent className="bg-teal-700 text-white border-2 border-teal-800">
                                    {graph.nodes.map((node, i) => {
                                        return (
                                            <SelectItem className="!hover:bg-teal-600"
                                                        key={i} value={node.name}>{node.name}</SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>)
                        }} name="to"/>
                    </div>
                    <div className="grid w-full items-center gap-3 py-2">
                        <Label htmlFor="edge-weight">Weight</Label>
                        <Input className="text-white border-4 border-teal-600 bg-teal-800 placeholder:text-gray-300"
                               id="edge-weight" type="number"
                               placeholder="Enter edge weight" {...register("weight", {required: true})}/>
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
