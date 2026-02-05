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
import ViewProductsDetels from "../Pages/DynamicPage/ViewProductsDetels";
import Cart from "../Pages/Navpage/Cart";
import Favorite from "../Pages/Navpage/Favorite";
import Messenger from "../Pages/Navpage/Messenger";
import Notification from "../Pages/Navpage/Notification";
import Paymentsuccess from "./Payment/Paymentsuccess";
import DashboardRoot from "../Pages/Dashboard/DashboardRoot";
import { Component } from "react";
import DasboardHome from "../Pages/Dashboard/DasboardHome";
import PaymentCancle from "./Payment/PaymentCancle";
import { createHashRouter } from "react-router";


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
                path: '/sign-in',
                Component: Signin
            },
            {
                path: '/sign-up',
                Component: Signup
            },
            {
                path: "/shop",
                Component: Shop
            },
            {
                path: "/hot-deal",
                Component: HOtdeal
            },
            {
                path: "/collection",
                Component: Collection
            },
            {
                path: '/local-stores',
                Component: Localstores
            },
            {
                path: "/blog",
                Component: Blog
            },
            {
                path: '/contact',
                Component: Contact
            },
            {
                path: "/productsdetels/:id",
                Component: ViewProductsDetels
            },
            {
                path: "/cart",
                Component: Cart
            },
            {
                path: '/favorite',
                Component: Favorite
            },
            {
                path: '/massenger',
                Component: Messenger
            },
            {
                path: "/notification",
                Component: Notification
            },
            {
                path: "/success",
                Component: Paymentsuccess
            },
            {
                path:"cancel",
                Component:PaymentCancle
            }


        ]


    },



    {
        path: "/dashboard",
        Component: DashboardRoot,
        children: [
            {
                index: true,
                Component: DasboardHome
            }
        ]
    }
]);