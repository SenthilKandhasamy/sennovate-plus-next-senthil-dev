import ApplicationAction from "@/components/admin/application-action";
import ApplicationStatus from "@/components/admin/application-status";
import KeyValueDisplay from "@/components/common/key-value-display";
import { db } from "@/db";
import { Divider } from "@nextui-org/react";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export default async function SinglePartnershipApplication({
  params,
}: PageProps) {
  const user = await db.user.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!user) return notFound();

  return (
    <div className="my-20">
      <div className="mb-4">
        <ApplicationStatus status={user.applicationStatus} />
      </div>
      <h1 className="text-4xl font-semibold">
        <span>Application For </span>
        <span>{user.partnershipType}</span>
      </h1>
      <Divider className="mt-4 mb-12" />

      <div className="space-y-4 max-w-screen-md">
        <KeyValueDisplay
          heading="Company Information"
          pairs={[
            { key: "Company Name", value: user.companyName },
            { key: "Country", value: user.country },
            { key: "State", value: user.state },
          ]}
        />
        <Divider />
        <KeyValueDisplay
          heading="Personal Information"
          pairs={[
            { key: "First Name", value: user.firstName },
            { key: "Last Name", value: user.lastName },
            { key: "Email", value: user.companyEmail },
            { key: "Job Title", value: user.jobTitle },
            { key: "Phone Number", value: user.phone },
            { key: "Remark", value: user.remark },
          ]}
        />
      </div>
      <Divider className="mt-12 mb-4" />
      <ApplicationAction user={user} />
    </div>
  );
}
