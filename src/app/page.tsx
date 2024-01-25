import DashboardWelcome from "@/components/dashboard-welcome";
import WithAuthentication from "@/components/with-authentication";

export default async function Home() {
  return (
    <WithAuthentication>
      <div className="my-20">
        <DashboardWelcome />
      </div>
    </WithAuthentication>
  );
}
