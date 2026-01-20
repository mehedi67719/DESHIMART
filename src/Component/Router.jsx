import { createBrowserRouter } from "react-router";
import Root from "./Root";
import { Component } from "react";
import Home from "../Pages/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home,
            }

        ]
    },
]);