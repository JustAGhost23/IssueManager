"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa6";

const NavBar = () => {
  const currentPath = usePathname();

  return (
    <nav className="flex h-16 items-center space-x-8 px-4 mb-4 border-b">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex space-x-8">
        <li>
          <Link
            className={`${
              currentPath === "/" ? "text-zinc-900" : "text-zinc-500"
            } hover:text-zinc-800 transition-colors`}
            href="/"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            className={`${
              currentPath === "/issues" ? "text-zinc-900" : "text-zinc-500"
            } hover:text-zinc-800 transition-colors`}
            href="/issues"
          >
            Issues
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
