import HeaderAuth from "@/components/header-auth";
import WithAuthentication from "@/components/with-authentication";

import { Navbar, NavbarBrand } from "@nextui-org/react";

export default function Home() {
  return (
    <WithAuthentication>
      <Navbar className="bg-slate-200">
        <NavbarBrand>
          <p className="font-bold text-inherit">Sennovate Plus</p>
        </NavbarBrand>
        <HeaderAuth />
      </Navbar>
    </WithAuthentication>
  );
}
