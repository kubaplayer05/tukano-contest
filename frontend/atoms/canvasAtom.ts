import {atom} from "jotai";
import {Graph, Node} from "@/lib/graph/graph";

export enum SelectedAction {
    AddNode = "AddNode",
    AddEdge = "AddEdge",
    SaveGraph = "SaveGraph"
}

export const selectedActionAtom = atom<SelectedAction | null>(null)
export const currentNodeAtom = atom<Node | null>(null)
export const graphAtom = atom<Graph>(new Graph([], []))
