import { data } from "react-router-dom";
import blogBazaarApi from "@/api";
import type { LoaderFunction } from "react-router-dom";
import { AxiosError } from "axios";


const blogDetailLoader: LoaderFunction = async ({params}) => {
    const slug = params.slug;
    try {
        const {data} = await blogBazaarApi.get(`/blogs/${slug}`);

        return data;
    } catch (error) {
        if(error instanceof AxiosError) {
            throw data(error.response?.data.message || error.message, {
                status: error.response?.status || error.status,
                statusText: error.response?.data.code || error.code,
            })
        }
        throw error;
    }
}

export default blogDetailLoader;