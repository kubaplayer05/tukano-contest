"use client"

import GraphCanvas from "@/components/graph/graphCanvas";
import CanvasSettings from "@/components/graph/canvasSettings";
import {useState} from "react";
import AddNodeDialog from "@/components/dialogs/addNodeDialog";
import AddEdgeDialog from "@/components/dialogs/addEdgeDialog";

export default function Home() {

    const [openDialog, setOpenDialog] = useState(false)

    return (
        <main className="flex items-center justify-center py-10 gap-2">
            <div className="max-w-[1200px] w-[80%] min-w-[280px] h-[700px] bg-teal-950 rounded-lg shadow">
                <GraphCanvas setOpenDialog={setOpenDialog}/>
            </div>
            <CanvasSettings setOpen={setOpenDialog}/>
            <AddNodeDialog open={openDialog} setOpen={setOpenDialog}/>
            <AddEdgeDialog open={openDialog} setOpen={setOpenDialog}/>
        </main>
    );
}