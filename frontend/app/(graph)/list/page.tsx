import Header from "@/components/header";
import GraphList from "@/components/graph/graphList";

export default function Home() {
    return (
        <>
            <Header/>
            <main className="flex flex-col items-center justify-between p-10">
                <GraphList/>
            </main>
        </>
    );
}
