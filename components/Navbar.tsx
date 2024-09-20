"use client";
import Link from "next/link";
import React from "react";
import UserButton from "./UserButton";
import CreateTask from "./CreateTask";
import { ThemeSwitcher } from "./ThemeSwitcher";
import useCurrentUser from "@/hooks/useCurrentUser";
import { buttonVariants } from "./ui/button";

const Navbar = () => {
  const { data: user } = useCurrentUser();
  return (
    <nav className="border-b py-2 px-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/">Taski</Link>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link
                href="/board"
                className={buttonVariants({
                  variant: "link",
                })}
              >
                Board
              </Link>
              <CreateTask />
              <UserButton />
            </>
          ) : null}
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
