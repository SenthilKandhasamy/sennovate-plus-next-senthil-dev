import HeaderAuth from "@/components/header-auth";
import { Provider } from "@/provider";
import { Navbar, NavbarBrand } from "@nextui-org/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
                Sennovate Plus
              </Link>
            </NavbarBrand>
            <HeaderAuth />
          </Navbar>

          <div className="container max-w-screen-lg">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
