"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import axios from "axios";
import { LogOut } from "lucide-react";

const Logout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.get("/api/user/logout");
      router.push("/signin");
    } catch (error) {
      console.log("Failed to logout", error);
    }
  };
  return (
    <Button onClick={handleLogout}>
      <LogOut className="w-4 h-4 mr-1.5" />
      Logout
    </Button>
  );
};

export default Logout;
