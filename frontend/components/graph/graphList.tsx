"use client"

import {useQuery} from "@tanstack/react-query";
import {getAllGraphsHandler} from "@/lib/api/getAllGraphs";
import {Separator} from "@/components/ui/separator";
import {Node, Edge} from "@/lib/graph/graph";
import GraphListItem from "@/components/graph/graphListItem";
import {useAtom} from "jotai/index";
import {authAtom} from "@/atoms/authAtom";
import DeleteGraphDialog from "@/components/dialogs/deleteGraphDialog";
import {useState} from "react";
import GenerateUrlDialog from "@/components/dialogs/generateUrlDialog";
import {GenerateUrlParams} from "@/lib/api/generateUrl";

export interface GraphResponse {
    name: string,
    nodes: Node[],
    edges: Edge[],
    createdAt: string,
    _id: string
}

export enum GraphItemAction {
    Delete = "Delete",
    Share = "Share"
}

export interface CurrentGraphItem {
    action?: GraphItemAction,
    id?: string,
    current?: GenerateUrlParams,
}

export default function GraphList() {

    const [openDialog, setOpenDialog] = useState(false)
    const [graphItem, setGraphItem] = useState<CurrentGraphItem | null>(null)
    const [username,] = useAtom(authAtom)
    const {data, status} = useQuery({
        queryKey: ["graphs"],
        queryFn: getAllGraphsHandler
    })

    if (!username) {
        return (
            <div className="min-w-[300px] mx-auto bg-zinc-700 rounded-lg shadow-md px-10 py-6">
                <h2>You must be authenticated to use graphs list</h2>
            </div>
        )
    }

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

    return (<>
            <div className="max-w-[1200px] w-[95%] mx-auto bg-zinc-700 rounded-lg shadow-md px-4 md:px-10 py-6">
                <h2 className="text-2xl text-center md:text-left">Graphs list</h2>
                <Separator className="my-2"/>
                <div className="w-full flex flex-col gap-2 my-6">
                    <div className="w-full grid grid-cols-2 md:grid-cols-5 py-2 px-4 rounded-xl bg-zinc-600 font-semibold">
                        <h3>Name</h3>
                        <h3 className="hidden md:block">Nodes count</h3>
                        <h3 className="hidden md:block">Edges count</h3>
                        <h3 className="hidden md:block">Created at</h3>
                        <h3>Actions</h3>
                    </div>
                    {data?.data.graphs.map((graph: GraphResponse) => {
                        return <GraphListItem graph={graph} key={graph._id}
                                              setGraphItem={setGraphItem} setOpenDialog={setOpenDialog}/>
                    })}
                </div>
            </div>
            <DeleteGraphDialog open={openDialog && graphItem?.action === "Delete"} setOpen={setOpenDialog}
                               graphId={graphItem?.id || ""}/>
            <GenerateUrlDialog open={openDialog && graphItem?.action === "Share"} setOpen={setOpenDialog}
                               graph={graphItem?.current || {edges: [], nodes: []}}/>
        </>
    )
}

