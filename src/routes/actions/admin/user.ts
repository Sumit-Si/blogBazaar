import { redirect } from "react-router-dom"
import blogBazaarApi from "@/api";
import type { ActionFunction } from "react-router-dom";
import { AxiosError } from "axios";
import type { ActionResponse } from "@/types";

const allUserAction: ActionFunction = async ({ request }) => {
    const data = (await request.json()) as { userId: string };

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) return redirect('/');

    try {
        await blogBazaarApi.delete(`/users/${data.userId}`, {
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

export default allUserAction;