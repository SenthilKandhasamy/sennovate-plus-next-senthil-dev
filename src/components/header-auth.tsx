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

export default function HeaderAuth() {
  const { status, data } = useSession();

  if (status === "loading") return null;

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
