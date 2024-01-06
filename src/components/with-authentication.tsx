"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function WithAuthentication({
  children,
}: {
  children: ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();

  console.log(status);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth-choice");
  }, [router, status]);

  if (status === "authenticated") {
    return <>{children}</>;
  }
}
