import {data,redirect, type LoaderFunction} from "react-router-dom";
import {AxiosError} from "axios";
import blogBazaarApi from "@/api";

const refreshTokenLoader: LoaderFunction = async ({request}) => {
    const url = new URL(request.url);
    const redirectUri = url.searchParams.get('redirect') ?? '/';

    try {
        const {data} = await blogBazaarApi.post(
            '/auth/refresh-token',
            {},
            {withCredentials: true},
        );

        localStorage.setItem('accessToken', data.accessToken);

        return redirect(redirectUri);
    } catch (error) {
        if(error instanceof AxiosError) {
            const tokenExpired = error.response?.data.message.include('token expired');

            if(tokenExpired) {
                localStorage.removeItem('user');
                localStorage.removeItem('accessToken');
                return redirect('/login');
            }

            throw data(error.response?.data.message || error.message, {
                status: error.response?.status || error.status,
                statusText: error.response?.data.code || error.code,
            })
        }
        throw error;
    }
}

export default refreshTokenLoader;