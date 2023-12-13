"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Skeleton from "../components/Skeleton";
import { FaBug } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  return (
    <nav className="px-4 py-4 mb-4 border-b">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
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
                    currentPath === "/issues"
                      ? "text-zinc-900"
                      : "text-zinc-500"
                  } hover:text-zinc-800 transition-colors`}
                  href="/issues"
                >
                  Issues
                </Link>
              </li>
            </ul>
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
