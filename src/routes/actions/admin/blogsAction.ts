import { redirect } from "react-router-dom"
import blogBazaarApi from "@/api";
import type { ActionFunction } from "react-router-dom";
import { AxiosError } from "axios";
import type { ActionResponse } from "@/types";

const blogsAction: ActionFunction = async ({ request }) => {
    const data = (await request.json()) as { blogId: string };

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) return redirect('/');

    try {
        await blogBazaarApi.delete(`/blogs/${data.blogId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return {
            ok: true,
        };
    } catch (error) {
        if (error instanceof AxiosError) {
            return {
                ok: false,
                error: error.response?.data,
            } as ActionResponse;
        }

        throw error;
    }
}

export default blogsAction;