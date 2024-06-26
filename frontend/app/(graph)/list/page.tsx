import Header from "@/components/header";
import GraphList from "@/components/graph/graphList";

export default function HomeList() {
    return (
        <>
            <Header/>
            <main className="w-full flex flex-col items-center justify-between p-10 px-5">
                <GraphList/>
            </main>
        </>
    );
}
