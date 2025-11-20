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
import adminLoader from "@/routes/loaders/admin/admin";
import RootErrorBoundary from "@/pages/error/Root";
import Dashboard from "@/pages/admin/Dashboard";
import dashboardLoader from "@/routes/loaders/admin/dashboard";
import blogEditAction from "@/routes/actions/admin/blogEdit";
import blogsAction from "@/routes/actions/admin/blogsAction";
import allUserAction from "@/routes/actions/admin/user";
import AdminBlogs from "@/pages/admin/AdminBlogs";
import allBlogLoader from "@/routes/loaders/admin/blogs";
import allCommentLoader from "@/routes/loaders/admin/comments";
import AdminComments from "@/pages/admin/AdminComments";
import allUserLoader from "@/routes/loaders/admin/users";
import AdminUsers from "@/pages/admin/AdminUsers";
import BlogCreate from "@/pages/admin/BlogCreate";
import blogCreateAction from "@/routes/actions/admin/blogCreate";
import BlogEdit from "@/pages/admin/BlogEdit";


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
        loader: adminLoader,
        ErrorBoundary: RootErrorBoundary,
        children: [
            {
                path: "dashboard",
                Component: Dashboard, 
                loader: dashboardLoader,
                handle: {
                    breadcrumb: "Dashboard"
                },
            },
            {
                path: "blogs",
                Component: AdminBlogs,
                loader: allBlogLoader,
                action: blogsAction,
                handle: {
                    breadcrumb: "Blogs"
                },
            },
            {
                path: "blogs/create",
                Component: BlogCreate,
                action: blogCreateAction,
                handle: {
                    breadcrumb: "Create a new blog"
                },
            },
            {
                path: "blogs/:slug/edit",
                Component: BlogEdit,
                loader: blogDetailLoader,
                action: blogEditAction,
                handle: {
                    breadcrumb: "Edit blog"
                },
            },
            {
                path: "comments",
                Component: AdminComments,
                loader: allCommentLoader,
                handle: {
                    breadcrumb: "Comments"
                },
            },
            {
                path: "users",
                Component: AdminUsers,
                loader: allUserLoader,
                action: allUserAction,
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