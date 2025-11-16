import { data } from "react-router-dom";
import blogBazaarApi from "@/api";
import type { LoaderFunction } from "react-router-dom";
import type { Blog, PaginatedResponse } from "@/types";
import { AxiosError } from "axios";

export interface HomeLoaderResponse {
    recentBlog: PaginatedResponse<Blog, 'blogs'>,
    allBlog: PaginatedResponse<Blog, 'blogs'>,
}

const homeLoader: LoaderFunction = async () => {
    try {
        const {data: recentBlog } = await blogBazaarApi.get('/blogs', {
            params: {limit: 4},
        });

        const {data: allBlog} = await blogBazaarApi.get('/blogs', {
            params: {
                offset: 4,
                limit: 12,
            }
        });

        return {recentBlog, allBlog} as HomeLoaderResponse;
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

export default homeLoader;