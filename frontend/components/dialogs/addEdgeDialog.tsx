"use client"

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Dispatch, SetStateAction} from "react";
import {useAtom} from "jotai";
import {graphAtom, selectedActionAtom} from "@/atoms/canvasAtom";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Edge, Graph} from "@/lib/graph/graph";
import ActionDialog from "@/components/dialogs/actionDialog";

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

    const [selectedAction, setSelectedAction] = useAtom(selectedActionAtom)
    const [graph, setGraph] = useAtom(graphAtom)
    const {register, handleSubmit, control, formState, setError} = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {

        if (data.from === data.to) {
            return setError("root", {type: "custom", message: "'from' and 'to' nodes are the same"})
        }

        if (graph.edges.find(edge => edge.from === data.from && edge.to === data.to)) {

            setGraph(prev => {
                const edges = prev.edges.filter(
                    edge => (edge.from !== data.from || edge.to !== data.to) && (edge.from !== data.to || edge.to !== data.from))

                const edge: Edge = {...data}
                const reversedEdge: Edge = {from: data.to, to: data.from, weight: data.weight}

                return new Graph(prev.nodes, [...edges, edge, reversedEdge])
            })

            setSelectedAction(null)
            setOpen(false)
            return
        }

        const edge: Edge = {...data}
        const reversedEdge: Edge = {from: data.to, to: data.from, weight: data.weight}

        setGraph(prev => {
            const edges = [...prev.edges, edge, reversedEdge]
            return new Graph(prev.nodes, edges)
        })

        setSelectedAction(null)
        setOpen(false)
    }

    const content = <>
        <div className="grid w-full items-center gap-3 py-2 pt-4">
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
        {formState.errors.root && <p className="font-semibold text-red-700">{formState.errors.root.message}</p>}
    </>

    return (
        <ActionDialog open={open && selectedAction === "AddEdge"} setOpen={setOpen}
                      content={content} onSubmit={handleSubmit(onSubmit)} title="Add new Edge to your Graph"/>
    )
}
