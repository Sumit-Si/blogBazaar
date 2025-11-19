import {redirect} from "react-router-dom"
import blogBazaarApi from "@/api";
import type { ActionFunction } from "react-router-dom";
import { AxiosError } from "axios";
import type { ActionResponse, AuthResponse } from "@/types";

const settingsAction: ActionFunction = async ({request}) => {
    const data = await request.json();

    const accessToken = localStorage.getItem("accessToken");

    if(!accessToken) return redirect('/');

    try {
        const response = await blogBazaarApi.put('/users/current', data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            withCredentials: true,
        });

        const responseData = response.data as AuthResponse;

        localStorage.setItem("user", JSON.stringify(responseData.user));

        return {
            ok: true,
            data: responseData,
        } as ActionResponse<AuthResponse>
    } catch (error) {
        if(error instanceof AxiosError) {
            return {
                ok: false,
                error: error.response?.data,
            } as ActionResponse;
        }
        throw error;
    }
}

export default settingsAction;