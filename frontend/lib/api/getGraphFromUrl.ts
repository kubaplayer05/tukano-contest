import axios, {AxiosResponse} from "axios";
import {config} from "@/lib/config";

export function getGraphFromUrl(q: string): Promise<AxiosResponse> {

    const url = config.apiUrl + `/api/graph/get/from/${q}`

    return axios.get(url, {...config.options})
}
