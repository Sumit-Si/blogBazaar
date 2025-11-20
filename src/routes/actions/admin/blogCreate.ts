import {redirect} from "react-router-dom"
import blogBazaarApi from "@/api";
import type { ActionFunction } from "react-router-dom";
import { AxiosError } from "axios";
import type { ActionResponse, BlogCreateResponse } from "@/types";

const blogCreateAction: ActionFunction = async ({request}) => {
    const formData = await request.formData();

    const accessToken = localStorage.getItem("accessToken");

    if(!accessToken) return redirect('/');

    try {
        const response = await blogBazaarApi.post('/blogs', formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Encoding': 'multipart/form-data',
            },
        });

        const responseData = response.data as BlogCreateResponse;

        return {
            ok: true,
            data: responseData,
        } as ActionResponse<BlogCreateResponse>;
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

export default blogCreateAction;