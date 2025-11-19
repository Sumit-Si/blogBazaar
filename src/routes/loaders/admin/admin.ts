import { data, redirect } from "react-router-dom";
import blogBazaarApi from "@/api";
import type { LoaderFunction } from "react-router-dom";
import { AxiosError } from "axios";


const adminLoader: LoaderFunction = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) return redirect('/');

    try {
        const { data } = await blogBazaarApi.get('/users/current', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        if (data.user.role !== 'admin') return redirect('/');
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

export default adminLoader;