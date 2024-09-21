"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import UserButton from "./UserButton";
import CreateTask from "./CreateTask";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import useUserStore from "@/store/useUserStore";

const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const getUser = useUserStore((state) => state.getUser);
  
  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <nav className="border-b py-2 px-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Taskii"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="hidden md:inline-flex text-2xl font-bold">
            Taskii
          </span>
        </Link>
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
              <UserButton user={user} />
            </>
          ) : null}
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
