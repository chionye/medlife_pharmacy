/** @format */

import React from "react";
import BottomNav from "@/components/bottom_nav";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
// import { getLocalStorage } from "@/services/storage";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import camera from "@/assets/camera.svg";
import { ChakraProvider } from "@chakra-ui/react";
import FullModal from "@/components/full_modal";
import { CreateAppointmentForm } from "@/components/appointment_form";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

const DoctorsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}>
      <ChakraProvider>
        <div className='bg-[#FFFFFF] h-screen overflow-y-hidden'>
          <div className='grid grid-cols-1 sm:grid-cols-12'>
            <div className='hidden sm:block sm:col-span-2'>
              <Navbar />
            </div>
            <div className='sm:col-span-10'>
              <Header />
              <div className='sm:col-span-12 px-2'>
                <div className='overflow-x-scroll h-screen pb-48'>
                  {children}
                </div>
              </div>
            </div>
          </div>
          <FullModal
            icon={<img src={camera} alt='open modal' />}
            title={"Create Appointment"}
            cn={
              "fixed lg:bottom-10 bottom-20 right-10 bg-[#585BA8CC] w-16 h-16 flex justify-center items-center rounded-full"
            }>
            <div className='flex justify-center items-center'>
              <CreateAppointmentForm />
            </div>
          </FullModal>
          <div className='fixed bottom-0 lg:hidden visible w-full'>
            <BottomNav />
          </div>
          {/* {NotifierComponent} */}
        </div>
      </ChakraProvider>
    </PersistQueryClientProvider>
  );
};

export default DoctorsLayout;
