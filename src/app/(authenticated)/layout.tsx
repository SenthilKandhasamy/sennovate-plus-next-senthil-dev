"use client";

import FullPageSkeleton from "@/components/common/full-page-skeleton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export default function AuthenticatedRoute({ children }: Props) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth-choice");
  }, [router, status]);

  if (status === "authenticated") {
    return <>{children}</>;
  }

  return <FullPageSkeleton />;
}
