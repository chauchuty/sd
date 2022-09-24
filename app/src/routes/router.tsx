import { createBrowserRouter, Navigate } from "react-router-dom";
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
        path: "*",
        element: <h3>404 - Not Found</h3>
    }
])