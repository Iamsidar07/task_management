"use client";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import TaskContextProvider from "./TaskContext";

const Provider = ({ children }: { children: ReactNode }) => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <TaskContextProvider>{children}</TaskContextProvider>
    </QueryClientProvider>
  );
};

export default Provider;
