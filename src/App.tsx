/** @format */

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import Routes from "./routes";
import MyContext from '@/context/context';
import { Toaster } from "./components/ui/toaster";

function App() {
  const router = createBrowserRouter(Routes);
  const [userData, setUserData] = useState<Record<string, any>>({
    _id: null,
    username: null,
    email: null,
    firstName: null,
    lastName: null,
    dob: null,
    gender: null,
    lga: null,
    occupation: null,
    state: null,
    phoneNumber: null,
    password: null,
    address: null,
    picture: null,
    file: null,
    success: null,
    title: null,
    description: null,
    accessToken: null,
    isAuthenticated: false,
    isVisible: false,
    mda_name: "",
  });

  const updateData = (newData: any) => {
    setUserData((prevData: { prevData: any }) => ({ ...prevData, ...newData }));
  };

  return (
    <MyContext.Provider value={{ userData, updateData }}>
      <RouterProvider router={router} />
      <Toaster />
    </MyContext.Provider>
  );
}

export default App;
