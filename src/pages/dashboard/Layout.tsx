/** @format */

import React from "react";
import BottomNav from "@/components/bottom_nav";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
// import { getLocalStorage } from "@/services/storage";
// import { QueryClient } from "@tanstack/react-query";
// import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
// import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import camera from "@/assets/camera.svg";
import { ChakraProvider } from "@chakra-ui/react";
import FullModal from "@/components/full_modal";
import AppointmentForm from "@/components/appointment_form";
// import { encodeIfURL } from "../../services/helpers";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       gcTime: 1000 * 60 * 60 * 24,
//     },
//   },
// });

// const persister = createSyncStoragePersister({
//   storage: window.localStorage,
// });

const Layout = ({ children }: { children: React.ReactNode }) => {
  //   const [profilePicture, setProfilePicture] = useState<string>("");

  //   useEffect(() => {
  //     const base64image = getLocalStorage("@picture");
  //     if (base64image) {
  //       setProfilePicture(JSON.parse(base64image));
  //     }
  //   }, []);

  return (
    // <PersistQueryClientProvider
    //   client={queryClient}
    //   persistOptions={{ persister }}>
    <ChakraProvider>
      <div className='bg-[#FFFFFF] h-screen overflow-y-hidden'>
        <div className='grid grid-cols-1 sm:grid-cols-12'>
          <div className='hidden sm:block sm:col-span-2'>
            <Navbar />
          </div>
          <div className='sm:col-span-10'>
            <Header image={""} />
            <div className='sm:col-span-12 px-2'>
              <div className='overflow-x-scroll h-screen pb-44'>{children}</div>
            </div>
          </div>
        </div>
        <FullModal
          icon={<img src={camera} alt='open modal' />}
          cn={
            "fixed md:bottom-10 bottom-32 right-10 bg-[#D20606CC] w-16 h-16 flex justify-center items-center rounded-full"
          }>
          <div className='py-4 border-[#00C2C2] border bg-[#F3FCFC] flex items-center px-2'>
            <p className='font-normal text-sm'>Book Appointment</p>
          </div>
          <div className='flex justify-center items-center'>
            <AppointmentForm />
          </div>
        </FullModal>
        <div className='fixed bottom-0 md:hidden visible w-full'>
          <BottomNav />
        </div>
      </div>
    </ChakraProvider>
    // </PersistQueryClientProvider>
  );
};

export default Layout;
