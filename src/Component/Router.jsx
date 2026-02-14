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
import DashboardRoot from "../Pages/Dashboard/DashboardRoot";
import DasboardHome from "../Pages/Dashboard/DasboardHome";
import Paymentsuccess from "../Pages/Payment/Paymentsuccess";
import PaymentCancle from "../Pages/Payment/PaymentCancle";
import PaymentFail from "../Pages/Payment/PaymentFail";
import Myorder from "../Pages/Dashboard/Myorder";
import Myprofile from "../Pages/Dashboard/Myprofile";
import Setting from "../Pages/Dashboard/Setting";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import BecomeSeller from "../Pages/Dashboard/BecomeSeller";
import UploadProduct from "../Pages/Dashboard/UploadProduct";
import Products from "../Pages/Dashboard/Products";
import Buyer_Order from "../Pages/Dashboard/Buyer_Order";
import My_Customer from "../Pages/Dashboard/My_Customer";




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
                path: "/payment-success",
                Component: Paymentsuccess
            },
            {
                path: "/payment-cancel",
                Component: PaymentCancle
            },
            {
                path: "/payment-fail",
                Component: PaymentFail
            },



        ]


    },



    {
        path: "/dashboard",
        Component: DashboardRoot,
        children: [
            {
                index: true,
                Component: DasboardHome
            },
            {
                path: '/dashboard/myorder',
                Component: Myorder
            },
            {
                path: '/dashboard/my-profile',
                Component: Myprofile
            },
            {
                path: "/dashboard/products",
                Component: Products
            },
            {
                path: "/dashboard/settings",
                Component: Setting
            },
            {
                path:"/dashboard/payments",
                Component:PaymentHistory
            },
            {
                path:"/dashboard/becomeaseller",
                Component:BecomeSeller
            },
            {
                path:'/dashboard/upload-products',
                Component:UploadProduct
            },
            {
                path:'/dashboard/buyer-order',
                Component:Buyer_Order
            },
            {
                path:"/dashboard/my-customer",
                Component:My_Customer
            }
        ]
    }
]);