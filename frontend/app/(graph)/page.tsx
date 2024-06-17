import Header from "@/components/header";
import {Toaster} from "@/components/ui/toaster";
import GraphContainer from "@/components/graph/graphContainer";
import React, {Suspense} from "react";

export default function Home() {

    return (
        <Suspense fallback={<div>loading...</div>}>
            <Header/>
            <main className="flex flex-col items-center justify-center py-10 gap-2 md:flex-row px-5">
                <GraphContainer/>
            </main>
            <Toaster/>
        </Suspense>
    );
}
