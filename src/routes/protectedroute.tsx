/** @format */

import { Navigate, Outlet } from "react-router-dom";
import { getCookie, getCookieData } from "../services/storage";
import Layout from "@/pages/patients/Layout";
import DoctorsLayout from "@/pages/doctors/Layout";

const ProtectedRoute = ({ role }: { role: string }) => {
  const userDataString = getCookie("@token");
  const user = getCookieData("user");

  if (userDataString && user) {
    // Check if the user's role matches the required role for this route
    if (user?.role === role || role === "all") {
      return role === "patient" ? (
        <Layout>
          <Outlet />{" "}
        </Layout>
      ) : role === "all" ? (
        <>
          <Outlet />{" "}
        </>
      ) : (
        <DoctorsLayout>
          <Outlet />{" "}
        </DoctorsLayout>
      );
    } else {
      // Redirect to home if the user tries to access a route for a different role
      return (
        <Navigate
          to={user?.role === "patient" ? "/patient/home" : "/doctor/home"}
          replace
        />
      );
    }
  } else {
    return <Navigate to='/' replace />;
  }
};
export default ProtectedRoute;
