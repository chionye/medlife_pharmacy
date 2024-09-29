/** @format */

import { Outlet } from "react-router-dom";
import Appointments from "@/pages/patients/Appointments";
import Settings from "@/pages/patients/Settings";
import Support from "@/pages/patients/Support";
import Home from "@/pages/patients/Home";
import Performance from "@/pages/patients/Performance";
import Wallet from "@/pages/patients/Wallet";
import Fund from "@/pages/patients/Fund";
import Transactions from "@/pages/patients/Transactions";
import Medication from "@/pages/patients/Medication";
import ProtectedRoute from "./protectedroute";
import Messages from "@/pages/patients/Messages";
import Layout from "@/pages/auth/Layout";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import DoctorsHome from "@/pages/doctors/Home";
import DoctorsAppointments from "@/pages/doctors/Appointments";
import Patients from "@/pages/doctors/Patients";
import DoctorWallet from "@/pages/doctors/Wallet";
import DoctorWithdraw from "@/pages/doctors/Withdraw";
import DoctorSettings from "@/pages/doctors/Settings";
import DoctorTransactions from "@/pages/doctors/Transactions";
import DoctorMessages from "@/pages/doctors/Messages";
import DoctorPerformance from "@/pages/doctors/Performance";
import ResetPassword from "@/pages/auth/ResetPassword";
import Verify from "@/pages/auth/Verify";
import ChangePassword from "@/pages/auth/ChangePassword";
import AdminHome from "@/pages/hospital/Home";
import AdminAppointments from "@/pages/hospital/Appointments";
import Users from "@/pages/hospital/Users";
import AdminSettings from "@/pages/hospital/Settings";
import AdminPerformance from "@/pages/hospital/Performance";
import AdminWallet from "@/pages/hospital/Wallet";
import AdminWithdraw from "@/pages/hospital/Withdraw";
import AdminTransactions from "@/pages/hospital/Transactions";
import AdminMessages from "@/pages/hospital/Messages";
import DoctorNotifications from "@/pages/doctors/Notifications";
import Doctors from "@/pages/patients/Doctors";
import VideoCall from "@/pages/call/Call";

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
    ],
  },
  {
    path: "/patient",
    element: <ProtectedRoute role='patient' />, // Only allow patient
    children: [
      {
        path: "/patient/home",
        element: <Home />,
      },
      {
        path: "/patient/doctors",
        element: <Doctors />,
      },
      {
        path: "/patient/appointments",
        element: <Appointments />,
      },
      {
        path: "/patient/settings",
        element: <Settings />,
      },
      {
        path: "/patient/settings/support-center",
        element: <Support />,
      },
      {
        path: "/patient/settings/rate-physicians-performance",
        element: <Performance />,
      },
      {
        path: "/patient/wallet",
        element: <Wallet />,
      },
      {
        path: "/patient/wallet/fund-wallet",
        element: <Fund />,
      },
      {
        path: "/patient/wallet/transactions",
        element: <Transactions />,
      },
      {
        path: "/patient/medication",
        element: <Medication />,
      },

      {
        path: "/patient/messages",
        element: <Messages />,
      },
    ],
  },
  {
    path: "/doctor",
    element: <ProtectedRoute role='doctor' />, // Only allow doctor
    children: [
      {
        path: "/doctor/home",
        element: <DoctorsHome />,
      },
      {
        path: "/doctor/appointments",
        element: <DoctorsAppointments />,
      },
      {
        path: "/doctor/patients",
        element: <Patients />,
      },
      {
        path: "/doctor/settings",
        element: <DoctorSettings />,
      },
      {
        path: "/doctor/settings/support-center",
        element: <Support />,
      },
      {
        path: "/doctor/settings/rate-patients-performance",
        element: <DoctorPerformance />,
      },
      {
        path: "/doctor/wallet",
        element: <DoctorWallet />,
      },
      {
        path: "/doctor/notifications",
        element: <DoctorNotifications />,
      },
      {
        path: "/doctor/wallet/withdraw",
        element: <DoctorWithdraw />,
      },
      {
        path: "/doctor/wallet/fund-wallet",
        element: <Fund />,
      },
      {
        path: "/doctor/wallet/transactions",
        element: <DoctorTransactions />,
      },
      {
        path: "/doctor/messages",
        element: <DoctorMessages />,
      },
    ],
  },
  {
    path: "/hospital",
    element: <ProtectedRoute role='hospital' />, // Only allow hospital
    children: [
      {
        path: "/hospital/home",
        element: <AdminHome />,
      },
      {
        path: "/hospital/appointments",
        element: <AdminAppointments />,
      },
      {
        path: "/hospital/users",
        element: <Users />,
      },
      {
        path: "/hospital/settings",
        element: <AdminSettings />,
      },
      {
        path: "/hospital/settings/support-center",
        element: <Support />,
      },
      {
        path: "/hospital/settings/rate-patients-performance",
        element: <AdminPerformance />,
      },
      {
        path: "/hospital/wallet",
        element: <AdminWallet />,
      },
      {
        path: "/hospital/wallet/withdraw",
        element: <AdminWithdraw />,
      },
      {
        path: "/hospital/wallet/fund-wallet",
        element: <Fund />,
      },
      {
        path: "/hospital/wallet/transactions",
        element: <AdminTransactions />,
      },
      {
        path: "/hospital/performance-metrics",
        element: <AdminPerformance />,
      },
      {
        path: "/hospital/messages",
        element: <AdminMessages />,
      },
    ],
  },
  {
    path: "/call",
    element: <ProtectedRoute role='all' />, // allow all
    children: [
      {
        path: "/call/:callId",
        element: <VideoCall />,
      },
    ],
  },
];

export default Routes;
