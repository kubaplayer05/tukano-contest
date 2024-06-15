import axios, {AxiosResponse} from "axios";
import {config} from "@/lib/config";
import {AuthParams} from "@/lib/api/types";

export function loginHandler(loginData: AuthParams): Promise<AxiosResponse> {

    const url = config.apiUrl + "/api/auth/login"

    return axios.post(url, loginData, {...config.options})
}
