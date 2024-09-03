/** @format */

// import { Outlet } from "react-router-dom";
import Appointments from "@/pages/dashboard/Appointments";
import Settings from "@/pages/dashboard/Settings";
import Support from "@/pages/dashboard/Support";
import Home from "@/pages/dashboard/Home";
import Performance from "@/pages/dashboard/Performance";
import Wallet from "@/pages/dashboard/Wallet";
import Fund from "@/pages/dashboard/Fund";
import Transactions from "@/pages/dashboard/Transactions";
import Medication from "@/pages/dashboard/Medication";
import ProtectedRoute from "./protectedroute";
import Messages from "@/pages/dashboard/Messages";
import { Outlet } from "react-router-dom";
import Layout from "@/pages/auth/Layout";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

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
    ],
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard/home",
        element: <Home />,
      },
      {
        path: "/dashboard/appointments",
        element: <Appointments />,
      },
      {
        path: "/dashboard/settings",
        element: <Settings />,
      },
      {
        path: "/dashboard/settings/support-center",
        element: <Support />,
      },
      {
        path: "/dashboard/settings/rate-physicians-performance",
        element: <Performance />,
      },
      {
        path: "/dashboard/wallet",
        element: <Wallet />,
      },
      {
        path: "/dashboard/wallet/fund-wallet",
        element: <Fund />,
      },
      {
        path: "/dashboard/wallet/transactions",
        element: <Transactions />,
      },
      {
        path: "/dashboard/medication",
        element: <Medication />,
      },

      {
        path: "/dashboard/messages",
        element: <Messages />,
      },
    ],
  },
];

export default Routes;
