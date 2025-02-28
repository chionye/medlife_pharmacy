/** @format */

import { Outlet } from "react-router-dom";
import Layout from "@/pages/auth/Layout";
import Onboarding from "@/pages/auth/onboarding";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ResetPassword from "@/pages/auth/ResetPassword";
import Verify from "@/pages/auth/Verify";
import ChangePassword from "@/pages/auth/ChangePassword";
import PharmacyHome from "@/pages/pharmacy/Home";
import TotalRevenue from "@/pages/pharmacy/TotalRevenue";
import ProductManagement from "@/pages/pharmacy/ProductManagement";
import OrderManagement from "@/pages/pharmacy/OrderManagement";
import InventoryManagement from "@/pages/pharmacy/InventoryManagement";
import Analytics from "@/pages/pharmacy/Analytics";
import CustomerInsight from "@/pages/pharmacy/CustomerInsight";
import ProductBreakdown from "@/pages/pharmacy/ProductBreakdown";
import PharmacySettings from "@/pages/pharmacy/Settings";
import ProtectedRoute from "./protectedroute";

const Routes = [
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/verify",
        element: <Verify />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/onboarding",
        element: <Onboarding />,
      },
    ],
  },
  {
    path: "/pharmacy",
    element: <ProtectedRoute role='all' />, // Only all
    children: [
      {
        path: "/pharmacy/home",
        element: <PharmacyHome />,
      },
      {
        path: "/pharmacy/total-revenue",
        element: <TotalRevenue />,
      },
      {
        path: "/pharmacy/product-management",
        element: <ProductManagement />,
      },
      {
        path: "/pharmacy/order-management",
        element: <OrderManagement />,
      },
      {
        path: "/pharmacy/inventory-management",
        element: <InventoryManagement />,
      },
      {
        path: "/pharmacy/analytics",
        element: <Analytics />,
      },
      {
        path: "/pharmacy/customer-insights",
        element: <CustomerInsight />,
      },
      {
        path: "/pharmacy/product-breakdown/:slug",
        element: <ProductBreakdown />,
      },
      {
        path: "/pharmacy/settings",
        element: <PharmacySettings />,
      },
    ],
  },
];

export default Routes;
