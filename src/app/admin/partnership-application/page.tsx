import ApplicationStatus from "@/components/admin/application-status";
import UserTable from "@/components/user-table";
import { db } from "@/db";
import { Divider } from "@nextui-org/react";

interface PageProps {
  searchParams?: { [key: string]: string | undefined };
}

export default async function PartnerShipApplications({
  searchParams,
}: PageProps) {
  let take = 10;
  let skip = 0;
  if (searchParams?.page) {
    skip = (+searchParams.page - 1) * take;
  }

  const users = await db.user.findMany({
    take,
    skip,
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalUser = await db.user.count();

  const columns = [
    { key: "status", label: "Status" },
    { key: "appliedFor", label: "Applied For" },
    { key: "name", label: "Name" },
    { key: "company", label: "Company" },
    { key: "country", label: "Country" },
  ];

  const rows = users.map((user) => ({
    key: user.id,
    status: <ApplicationStatus status={user.applicationStatus} />,
    appliedFor: (
      <div>
        {user.partnershipType === "Referral" ? (
          <span className="text-primary-500">{user.partnershipType}</span>
        ) : (
          <span className="text-secondary-500">{user.partnershipType}</span>
        )}
      </div>
    ),
    name: `${user.firstName} ${user.lastName}`,
    company: user.companyName,
    country: user.country,
  }));

  return (
    <div className="my-20">
      <h1 className="text-3xl">Partnership Requests</h1>
      <Divider className="my-4" />
      <UserTable
        columns={columns}
        rows={rows}
        total={totalUser}
        perPage={take}
      />
    </div>
  );
}
