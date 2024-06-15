import axios, {AxiosResponse} from "axios";
import {config} from "@/lib/config";
import {AuthParams} from "@/lib/api/types";

export function registerHandler(loginData: AuthParams): Promise<AxiosResponse> {

    const url = config.apiUrl + "/api/auth/register"

    return axios.post(url, loginData, {...config.options})
}
