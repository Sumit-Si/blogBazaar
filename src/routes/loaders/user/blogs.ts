import { data } from "react-router-dom";
import blogBazaarApi from "@/api";
import type { LoaderFunction } from "react-router-dom";
import type { Blog, PaginatedResponse } from "@/types";
import { AxiosError } from "axios";


const userBlogLoader: LoaderFunction = async ({request}) => {
    const url = new URL(request.url);
    try {
        const response = await blogBazaarApi.get('/blogs', {
            params: Object.fromEntries(url.searchParams),
        });

        const data = response.data as PaginatedResponse<Blog, 'blogs'>;

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

export default userBlogLoader;