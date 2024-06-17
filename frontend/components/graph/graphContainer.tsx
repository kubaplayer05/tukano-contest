"use client"

import {useState} from "react";
import GraphCanvas from "@/components/graph/graphCanvas";
import CanvasSettings from "@/components/graph/canvasSettings";
import AddNodeDialog from "@/components/dialogs/addNodeDialog";
import AddEdgeDialog from "@/components/dialogs/addEdgeDialog";
import SaveGraphDialog from "@/components/dialogs/saveGraphDialog";

export default function GraphContainer() {

    const [openDialog, setOpenDialog] = useState(false)

    return (
        <>
            <div
                className="max-w-[1200px] w-[90%] overflow-x-scroll min-w-[280px] h-[700px] bg-teal-950 rounded-lg shadow">
                <GraphCanvas setOpenDialog={setOpenDialog}/>
            </div>
            <CanvasSettings setOpen={setOpenDialog}/>
            <AddNodeDialog open={openDialog} setOpen={setOpenDialog}/>
            <AddEdgeDialog open={openDialog} setOpen={setOpenDialog}/>
            <SaveGraphDialog open={openDialog} setOpen={setOpenDialog}/>
        </>
    )
}
