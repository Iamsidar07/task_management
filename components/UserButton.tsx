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
import { Avatar, AvatarFallback } from "./ui/avatar";
import { User } from "@/types";
interface Props {
  user: User;
}
const UserButton = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {user ? (
          <Avatar>
            <AvatarFallback className="uppercase">
              {user?.firstName?.slice(0, 1) + user?.lastName?.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
        ) : null}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[170px]">
        <DropdownMenuItem className="font-bold truncate capitalize">
          {user.firstName} {user.lastName}
        </DropdownMenuItem>
        <DropdownMenuItem className="text-sm truncate">
          {user.email}
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
