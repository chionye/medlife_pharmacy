/** @format */

import React from "react";
import BottomNav from "@/components/bottom_nav";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
// import { getLocalStorage } from "@/services/storage";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { ChakraProvider } from "@chakra-ui/react";

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

const Layout = ({ children }: { children: React.ReactNode }) => {
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
                <div className='overflow-x-scroll h-screen pb-48 lg:px-10'>
                  {children}
                </div>
              </div>
            </div>
          </div>
          <div className='fixed bottom-0 lg:hidden visible w-full'>
            <BottomNav />
          </div>
          {/* {NotifierComponent} */}
        </div>
      </ChakraProvider>
    </PersistQueryClientProvider>
  );
};

export default Layout;
