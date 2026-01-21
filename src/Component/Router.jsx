import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "../Pages/Navpage/Home";
import Signin from "../Pages/Authentication/Signin";
import Signup from "../Pages/Authentication/Signup";
import Shop from "../Pages/Navpage/Shop";
import HOtdeal from "../Pages/Navpage/HOtdeal";
import Collection from "../Pages/Navpage/Collection";
import Localstores from "../Pages/Navpage/Localstores";
import Blog from "../Pages/Navpage/Blog";
import Contact from "../Pages/Navpage/Contact";



export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home,
            },
            
            {
                path:'/sign-in',
                Component:Signin
            },
            {
                path:'/sign-up',
                Component:Signup
            },
            {
                path:"/shop",
                Component:Shop
            },
            {
                path:"/hot-deal",
                Component:HOtdeal
            },
            {
                path:"/collection",
                Component:Collection
            },
            {
                path:'/local-stores',
                Component:Localstores
            },
            {
                path:"/blog",
                Component:Blog
            },
            {
                path:'/contact',
                Component:Contact
            }

        ]
    },
]);