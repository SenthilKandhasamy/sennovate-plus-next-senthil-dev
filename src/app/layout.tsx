import Logo from "@/assets/logo.svg";
import HeaderAuth from "@/components/header-auth";
import { Provider } from "@/provider";
import { Navbar, NavbarBrand } from "@nextui-org/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sennovate Plus",
  description: "Extension of Sennovate Inc",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark text-foreground bg-background">
      <body className={inter.className}>
        <Provider>
          <Navbar className="bg-gray-950" shouldHideOnScroll>
            <NavbarBrand>
              <Link className="font-bold text-2xl" href="/">
                <Image src={Logo} alt="Sennovate plus Logo" />
              </Link>
            </NavbarBrand>
            <HeaderAuth />
          </Navbar>

          <div className="container max-w-screen-lg mb-20">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
