import { getServerSession } from "@/auth";
import { paths } from "@/paths";
import { getUserType } from "@/user-type";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  switch (getUserType(session?.user.roles)) {
    case "admin":
      return redirect(paths.admin());

    default:
      return redirect(paths.service());
  }
}
