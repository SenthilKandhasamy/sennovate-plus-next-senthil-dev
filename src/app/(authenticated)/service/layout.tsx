import WithAuthentication from "@/components/with-authentication";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <WithAuthentication>{children}</WithAuthentication>;
}
