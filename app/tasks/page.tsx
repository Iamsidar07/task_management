"use client";

import axios from "axios";
import { useQuery } from "react-query";

export default function Tasks() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axios.get("/api/task");
      return response.data;
    },
  });
  console.log({data});
  return <div></div>;
}
