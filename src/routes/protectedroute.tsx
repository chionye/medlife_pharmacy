/** @format */

import { Navigate, Outlet } from "react-router-dom";
import { getCookie, getCookieData } from "../services/storage";
import Layout from "@/pages/dashboard/Layout";
import DoctorsLayout from "@/pages/doctors_dashboard/Layout";

const ProtectedRoute = () => {
  const userDataString = getCookie("@token");
  const user = getCookieData("user");
  if (userDataString && user) {
    return user?.role === "patient" ? (
      <Layout>
        <Outlet />{" "}
      </Layout>
    ) : user?.role === "doctor" ? (
      <DoctorsLayout>
        <Outlet />{" "}
      </DoctorsLayout>
    ) : (
      <Navigate to='/' replace />
    );
  } else {
    return <Navigate to='/' replace />;
  }
};
export default ProtectedRoute;
