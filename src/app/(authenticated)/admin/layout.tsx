import { getServerSession } from "@/auth";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: Props) {
  const data = await getServerSession();

  if (!data?.user.roles.includes("admin")) {
    return redirect("/");
  }

  return <>{children}</>;
}
