"use client"

import {useAtom} from "jotai";
import {graphAtom, shortestPathValueAtom} from "@/atoms/canvasAtom";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {useMutation} from "@tanstack/react-query";
import {findShortestPathHandler, FindShortestPathParams} from "@/lib/api/findShortestPath";
import {Graph} from "@/lib/graph/graph";


interface Inputs {
    start: string,
    end: string,
}

interface findShortestPathResponse {
    value: number,
    distances: {
        value: number,
        prevNode: null | string
    }
    routes: string[],
}

export default function FindShortestPathForm() {

    const [graph, setGraph] = useAtom(graphAtom)
    const [shortestPathValue, setShortestPathValue] = useAtom(shortestPathValueAtom)
    const {control, handleSubmit} = useForm<Inputs>()
    const mutation = useMutation({
        mutationFn: findShortestPathHandler,
        onSuccess: (res) => {

            const {value, routes}: findShortestPathResponse = res.data

            setShortestPathValue(value)
            setGraph(prev => {

                const edges = [...prev.edges]

                if (value > 0) {

                    for (let i = 0; i < routes.length - 1; i++) {

                        const from = routes[i]
                        const to = routes[i + 1]

                        const edgeIndex1 = edges.findIndex(edge => edge.from === from && edge.to === to)
                        const edgeIndex2 = edges.findIndex(edge => edge.from === to && edge.to === from)

                        edges[edgeIndex1].isActive = true
                        edges[edgeIndex2].isActive = true
                    }
                }

                return new Graph(prev.nodes, edges)
            })
        }
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const params: FindShortestPathParams = {...data, nodes: graph.nodes, edges: graph.edges}
        mutation.mutate(params)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="py-4 flex flex-col gap-6">
            <div className="grid w-full items-center gap-3">
                <Label htmlFor="start-node">Starting Node:</Label>
                <Controller control={control} rules={{required: true}} render={({field}) => {
                    return (<Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger id="start-node"
                                       className="w-full text-white border-4 border-zinc-600 bg-zinc-700 placeholder:text-gray-300">
                            <SelectValue placeholder="Select a starting Node"/>
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-700 text-white border-2 border-zinc-800">
                            {graph.nodes.map((node, i) => {
                                return (
                                    <SelectItem
                                        key={i} value={node.name}>{node.name}</SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>)
                }} name="start"/>
            </div>
            <div className="grid w-full items-center gap-3">
                <Label htmlFor="end-node">Ending Node:</Label>
                <Controller control={control} rules={{required: true}} render={({field}) => {
                    return (<Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger id="end-node"
                                       className="w-full text-white border-4 border-zinc-600 bg-zinc-700 placeholder:text-gray-300">
                            <SelectValue placeholder="Select a ending Node"/>
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-700 text-white border-2 border-zinc-800">
                            {graph.nodes.map((node, i) => {
                                return (
                                    <SelectItem
                                        key={i} value={node.name}>{node.name}</SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>)
                }} name="end"/>
            </div>
            <Button className="w-full bg-zinc-600 hover:bg-zinc-700">Calculate</Button>
            {shortestPathValue && <p className="w-full bg-teal-700 text-white px-4 py-2 text-center rounded-lg">Distance: {shortestPathValue}</p>}
        </form>
    )
}
