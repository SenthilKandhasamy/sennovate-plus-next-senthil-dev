"use client";

import { getUserType } from "@/user-type";
import { useSession } from "next-auth/react";
import AdminDashboard from "./dashboards/admin";
import EmployeeDashboard from "./dashboards/employee";
import ReferralDashboard from "./dashboards/referral";
import ResellerDashboard from "./dashboards/reseller";

export default function DashboardWelcome() {
  const { status, data } = useSession();

  if (status === "loading" || status === "unauthenticated" || !data) {
    return null;
  }

  switch (getUserType(data.user.roles)) {
    case "admin":
      return <AdminDashboard />;
    case "employee":
      return <EmployeeDashboard />;
    case "referral":
      return <ReferralDashboard />;
    case "reseller":
      return <ResellerDashboard />;

    default:
      return <div>Welcome to the Portal</div>;
  }
}
