"use client"

import GraphCanvas from "@/components/graph/graphCanvas";
import CanvasSettings from "@/components/graph/canvasSettings";
import {useState} from "react";
import AddNodeDialog from "@/components/dialogs/addNodeDialog";
import AddEdgeDialog from "@/components/dialogs/addEdgeDialog";
import Header from "@/components/header";
import SaveGraphDialog from "@/components/dialogs/saveGraphDialog";
import {Toaster} from "@/components/ui/toaster";

export default function Home() {

    const [openDialog, setOpenDialog] = useState(false)

    return (
        <>
            <Header/>
            <main className="flex flex-col items-center justify-center py-10 gap-2 md:flex-row px-5">
                <div className="max-w-[1200px] w-[90%] overflow-x-scroll min-w-[280px] h-[700px] bg-teal-950 rounded-lg shadow">
                    <GraphCanvas setOpenDialog={setOpenDialog}/>
                </div>
                <CanvasSettings setOpen={setOpenDialog}/>
                <AddNodeDialog open={openDialog} setOpen={setOpenDialog}/>
                <AddEdgeDialog open={openDialog} setOpen={setOpenDialog}/>
                <SaveGraphDialog open={openDialog} setOpen={setOpenDialog}/>
            </main>
            <Toaster/>
        </>
    );
}
