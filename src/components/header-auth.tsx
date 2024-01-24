"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarContent,
  NavbarItem,
  User,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function HeaderAuth() {
  const { status, data } = useSession();
  const isAdmin = data?.user.groups?.includes("admin") as any;

  if (status === "loading") return null;
  if (status === "authenticated")
    return (
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <User
                as="button"
                description={data?.user?.email}
                name={data?.user?.name}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              {isAdmin && (
                <DropdownItem key="admin" as={Link} href="/admin">
                  Admin Section
                </DropdownItem>
              )}
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => {
                  signOut();
                }}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    );
}
