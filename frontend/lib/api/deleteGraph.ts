import axios, {AxiosResponse} from "axios";
import {config} from "@/lib/config";

interface deleteGraphParams {
    graphId: string
}

export function deleteGraphHandler(params: deleteGraphParams): Promise<AxiosResponse> {

    const url = config.apiUrl + `/api/graph/delete/${params.graphId}`

    return axios.delete(url, {...config.options})
}
