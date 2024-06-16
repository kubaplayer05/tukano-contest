import {SaveGraphParams} from "@/lib/api/types";
import axios, {AxiosResponse} from "axios";
import {config} from "@/lib/config";

export function saveGraphHandler(saveGraphData: SaveGraphParams): Promise<AxiosResponse> {

    const url = config.apiUrl + "/api/graph/save"

    return axios.post(url, saveGraphData, {...config.options})
}
