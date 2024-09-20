"use client";
import axios from "axios";
import { useQuery } from "react-query";
const useCurrentUser = () => {
  const data = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await axios.get("/api/user/me");
      return response.data;
    },
  });
  return data;
};
export default useCurrentUser;
