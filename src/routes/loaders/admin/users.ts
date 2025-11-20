import { data, redirect } from "react-router-dom";
import blogBazaarApi from "@/api";
import type { LoaderFunction } from "react-router-dom";
import { AxiosError } from "axios";


const allUserLoader: LoaderFunction = async ({request}) => {
    const url = new URL(request.url);
    const accessToken = localStorage.getItem("accessToken");

    if(!accessToken) return redirect('/');

    try {
        const {data} = await blogBazaarApi.get('/users', {
            params: Object.fromEntries(url.searchParams.entries()),
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw data(error.response?.data.message || error.message, {
                status: error.response?.status || error.status,
                statusText: error.response?.data.code || error.code,
            })
        }
        throw error;
    }
}

export default allUserLoader;