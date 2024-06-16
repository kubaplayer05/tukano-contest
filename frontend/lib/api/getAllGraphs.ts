import axios, {AxiosResponse} from "axios";
import {config} from "@/lib/config";

export function getAllGraphsHandler(): Promise<AxiosResponse> {

    const url = config.apiUrl + "/api/graph/get/all"

    return axios.get(url, {...config.options})
}
