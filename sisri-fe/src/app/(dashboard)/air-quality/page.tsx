"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

import AdminPage from "@/components/dashboard/admin/AdminPage";

const Page = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AdminPage />
      </QueryClientProvider>
    </>
  );
};

export default Page;
