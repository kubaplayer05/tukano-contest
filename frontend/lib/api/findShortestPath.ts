import axios, {AxiosResponse} from "axios";
import {config} from "@/lib/config";
import {Node, Edge} from "@/lib/graph/graph";

export interface FindShortestPathParams {
    nodes: Node[],
    edges: Edge[],
    start: string,
    end: string
}

export function findShortestPathHandler(params: FindShortestPathParams): Promise<AxiosResponse> {

    const url = config.apiUrl + "/api/graph/find-shortest-path"

    return axios.post(url, params, {...config.options})
}
