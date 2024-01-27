import KeyValueDisplay from "@/components/common/key-value-display";
import SimpleSkeleton from "@/components/common/simple-skeleton";
import ServiceApproval from "@/components/partnership-request/service-approval";
import PartnershipRequestStatus from "@/components/partnership-request/status";
import { db } from "@/db";
import { Divider } from "@nextui-org/react";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
  params: { id: string };
}

export default async function SinglePartnershipApplication({
  params,
}: PageProps) {
  const request = await db.partnershipRequest.findFirst({
    where: { id: params.id },
    include: {
      approvedServices: true,
      comments: true,
      partnerEmployee: {
        include: {
          company: true,
        },
      },
    },
  });

  if (!request) return notFound();
  const person = request.partnerEmployee;
  const company = request.partnerEmployee.company;

  return (
    <div className="my-20 space-y-10">
      <section>
        <PartnershipRequestStatus status={request.status} />
        <h1 className="text-3xl font-bold mt-2">
          Request For {request.requestedFor}
        </h1>
      </section>
      <Divider />

      <section className="max-w-screen-md space-y-4">
        <div>
          <KeyValueDisplay
            heading="Company Information"
            pairs={[
              { key: "Name", value: company.name },
              { key: "Country", value: company.country },
              { key: "State", value: company.state },
              { key: "Website", value: company.website },
            ]}
          />
        </div>
        <div>
          <KeyValueDisplay
            heading="Personal Information"
            pairs={[
              { key: "Name", value: person.name },
              { key: "Job Title", value: person.jobTitle },
              { key: "Email", value: person.email },
              { key: "Phone", value: person.phone },
            ]}
          />
        </div>
      </section>
      <Divider />
      <section>
        <h2 className="text-2xl mb-1">Service Approval</h2>
        <p className="opacity-70 mb-8">
          This will be effective once the request is approved
        </p>
        <Suspense fallback={<SimpleSkeleton />}>
          <ServiceApproval
            approvedServices={request.approvedServices}
            requestId={request.id}
          />
        </Suspense>
      </section>
    </div>
  );
}
