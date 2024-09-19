"use client";
import Link from "next/link";
import React from "react";
import UserButton from "./UserButton";
import CreateTask from "./CreateTask";

const Navbar = () => {
  return (
    <nav className="border-b py-2">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/">Taski</Link>
        <div className="flex items-center gap-2">
          <CreateTask />
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
