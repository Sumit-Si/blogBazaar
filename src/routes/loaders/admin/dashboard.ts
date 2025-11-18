import { data, redirect } from "react-router-dom";
import blogBazaarApi from "@/api";
import type { LoaderFunction } from "react-router-dom";
import type { PaginatedResponse, Blog, Comment, User } from "@/types";
import { AxiosError } from "axios";

export type DashboardData = {
    blogsCount: number;
    commentsCount: number;
    usersCount: number;
    blogs: Blog[];
    comments: Comment[];
    users: User[];
}

const dashboardLoader: LoaderFunction = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) return redirect('/');

    try {
        const blogsResponse = await blogBazaarApi.get('/blogs', {
            params: { limit: 5 },
        });

        const commentsResponse = await blogBazaarApi.get('/comments', {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: { limit: 5 },
        });

        const usersResponse = await blogBazaarApi.get('/users', {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: { limit: 5 },
        });

        const paginatedBlogs = blogsResponse.data as PaginatedResponse<Blog, 'blogs'>;
        const paginatedComments = commentsResponse.data as PaginatedResponse<Comment, 'comments'>;
        const paginatedUsers = usersResponse.data as PaginatedResponse<User, 'users'>;

        return {
            blogsCount: paginatedBlogs.total,
            commentsCount: paginatedComments.total,
            usersCount: paginatedUsers.total,
            blogs: paginatedBlogs.blogs,
            comments: paginatedComments.comments,
            users: paginatedUsers.users,
        } as DashboardData;
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

export default dashboardLoader;