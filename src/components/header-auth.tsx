"use client";
import * as actions from "@/actions";
import { getUserType } from "@/user-type";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarContent,
  NavbarItem,
  User,
} from "@nextui-org/react";
import capitalize from "lodash/capitalize";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function HeaderAuth() {
  const { status, data } = useSession();
  const userType = getUserType(data?.user.roles);
  const isAdmin: any = userType === "admin";

  if (status === "loading") return null;
  if (status === "authenticated")
    return (
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <User
                as="button"
                description={capitalize(userType)}
                name={data.user.email}
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
                onPress={async () => {
                  await actions.logout();
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
