"use client"

import {GraphResponse} from "@/components/graph/graphList";
import {Button} from "@/components/ui/button";
import {FaPlay, FaShare} from "react-icons/fa6";
import {FaTrashAlt} from "react-icons/fa";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {useRouter} from "next/navigation";
import {useAtom} from "jotai";
import {graphAtom} from "@/atoms/canvasAtom";
import {Graph} from "@/lib/graph/graph";

interface GraphListItemProps {
    graph: GraphResponse
}

export default function GraphListItem({graph}: GraphListItemProps) {

    const formattedDate = new Date(graph.createdAt).toLocaleDateString()

    const router = useRouter()
    const [, setCurrentGraph] = useAtom(graphAtom)

    const loadGraph = () => {
        setCurrentGraph(new Graph(graph.nodes, graph.edges))
        router.push("/")
    }

    return (
        <div className="w-full grid grid-cols-5 py-2 px-4 rounded-xl bg-zinc-600 items-center">
            <h3>{graph.name}</h3>
            <p>{graph.nodes.length}</p>
            <p>{graph.edges.length}</p>
            <p>{formattedDate}</p>
            <div className="flex gap-4">
                <Tooltip>
                    <TooltipTrigger>
                        <Button onClick={loadGraph} className="px-4 py-2 bg-zinc-500 hover:bg-zinc-700"><FaPlay/></Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-zinc-800 text-white">
                        <p>Load graph</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger>
                        <Button className="px-4 py-2 bg-zinc-500 hover:bg-zinc-700"><FaTrashAlt/></Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-zinc-800 text-white">
                        <p>Delete graph</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger>
                        <Button className="px-4 py-2 bg-zinc-500 hover:bg-zinc-700"><FaShare/></Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-zinc-800 text-white">
                        <p>Generate link</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    )
}
