"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Logout from "./Logout";
import { Separator } from "./ui/separator";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Avatar, AvatarFallback } from "./ui/avatar";

const UserButton = () => {
  const { data } = useCurrentUser();
  if (!data) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {data ? (
          <Avatar>
            <AvatarFallback className="uppercase">
              {data?.firstName?.slice(0, 1) + data?.lastName?.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
        ) : null}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[170px]">
        <DropdownMenuItem className="font-bold truncate capitalize">
          {data.firstName} {data.lastName}
        </DropdownMenuItem>
        <DropdownMenuItem className="text-sm truncate">
          {data.email}
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Logout />{" "}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
