"use client";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import Logout from "./Logout";
import { Separator } from "./ui/separator";

const UserButton = () => {
  const { data, error, isLoading } = useQuery({
    queryFn: async () => {
      const response = await axios.get("/api/user/me");
      return response.data;
    },
  });
  if (error) {
    toast.error("Failed to retrieve user profile");
    return null;
  }
  if (!data) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isLoading}>
        {isLoading ? (
          <Loader />
        ) : (
          data?.firstName?.slice(0, 1) + data?.lastName?.slice(0, 1)
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[270px]">
        <DropdownMenuItem className="font-bold">
          {data.firstName} {data.lastName}
        </DropdownMenuItem>
        <DropdownMenuItem className="text-sm">{data.email}</DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
