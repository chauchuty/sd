import { createBrowserRouter, Navigate } from "react-router-dom";
import ChatPage from "../pages/chat.page";
import HomePage from "../pages/home.page";
import LoginPage from "../pages/login.page";
import RegisterPage from "../pages/register.page";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: "/home",
        element: <HomePage />
    },
    {
        path: "/chat",
        element: <ChatPage />
    },
    {
        path: "*",
        element: <h3>404 - Not Found</h3>
    }
])