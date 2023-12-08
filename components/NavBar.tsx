"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

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
      <Box>
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Log out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Login</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
