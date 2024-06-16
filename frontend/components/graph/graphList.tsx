"use client"

import {useQuery} from "@tanstack/react-query";
import {getAllGraphsHandler} from "@/lib/api/getAllGraphs";
import {Separator} from "@/components/ui/separator";
import {Node, Edge} from "@/lib/graph/graph";
import GraphListItem from "@/components/graph/graphListItem";

export interface GraphResponse {
    name: string,
    nodes: Node[],
    edges: Edge[],
    createdAt: string,
    _id: string
}

export default function GraphList() {

    const {data, status} = useQuery({
        queryKey: ["graphs"],
        queryFn: getAllGraphsHandler
    })

    if (status === "pending") {
        return (
            <div>
                <h3>loading...</h3>
            </div>
        )
    }

    if (status === "error") {
        return (
            <div>
                <h3>Could not get user graphs</h3>
            </div>
        )
    }

    console.log(data?.data)

    return (
        <div className="max-w-[1200px] w-[80%] mx-auto bg-zinc-700 rounded-lg shadow-md px-10 py-6">
            <h2 className="text-2xl">Graphs list</h2>
            <Separator className="my-2"/>
            <div className="w-full flex flex-col gap-2 my-6">
                <div className="w-full grid grid-cols-5 py-2 px-4 rounded-xl bg-zinc-600 font-semibold">
                    <h3>Name</h3>
                    <h3>Nodes count</h3>
                    <h3>Edges count</h3>
                    <h3>Created at</h3>
                    <h3>Actions</h3>
                </div>
                {data?.data.graphs.map((graph: GraphResponse) => {
                    return <GraphListItem graph={graph} key={graph._id}/>
                })}
            </div>
        </div>
    )
}
