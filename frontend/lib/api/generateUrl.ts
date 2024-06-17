import axios, {AxiosResponse} from "axios";
import {config} from "@/lib/config";
import {Node, Edge} from "@/lib/graph/graph";

export interface GenerateUrlParams {
    nodes: Node[],
    edges: Edge[],
    [key: string]: any
}

export function generateUrlHandler(params: GenerateUrlParams): Promise<AxiosResponse> {

    const url = config.apiUrl + "/api/graph/generate-url"

    return axios.post(url, params, {...config.options})
}
