import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import signupAction from "@/routes/actions/auth/signup";
import loginAction from "@/routes/actions/auth/login";
import refreshTokenLoader from "@/routes/loaders/refreshToken";
import homeLoader from "@/routes/loaders/user/home";
import RootLayout from "@/components/layouts/Root";
import Home from "@/pages/user/Home";
import settingsAction from "@/routes/actions/user/settings";
import Blogs from "@/pages/user/Blogs";
import userBlogLoader from "@/routes/loaders/user/blogs";
import BlogDetail from "@/pages/user/BlogDetail";
import blogDetailLoader from "./loaders/user/blogDetail";
import AdminLayout from "@/components/layouts/AdminLayout";


const router = createBrowserRouter([
    {
        path: "/login",
        Component: Login,
        action: loginAction,
    },
    {
        path: "/signup",
        Component: Signup,
        action: signupAction,
    },
    {
        path: "/refresh-token",
        loader: refreshTokenLoader,
    },
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
                loader: homeLoader,
            },
            {
                path: "blogs",
                Component: Blogs,
                loader: userBlogLoader,
            },
            {
                path: "/blogs/:slug",
                Component: BlogDetail,
                loader: blogDetailLoader,
            }
        ]
    },
    {
        path: "admin",
        Component: AdminLayout,
        children: [
            {
                path: "dashboard",
                handle: {
                    breadcrumb: "Dashboard"
                },
            },
            {
                path: "blogs",
                handle: {
                    breadcrumb: "Blogs"
                },
            },
            {
                path: "blogs/create",
                handle: {
                    breadcrumb: "Create a new blog"
                },
            },
            {
                path: "blogs/:slug/edit",
                handle: {
                    breadcrumb: "Edit blog"
                },
            },
            {
                path: "comments",
                handle: {
                    breadcrumb: "Comments"
                },
            },
            {
                path: "users",
                handle: {
                    breadcrumb: "Users"
                },
            },

        ]
    },
    {
        path: "/settings",
        action: settingsAction
    }
]);

export default router;