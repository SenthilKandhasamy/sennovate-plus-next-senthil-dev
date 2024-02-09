import BreadCrumbs from "@/components/breadcrumbs";
import KeyValueDisplay from "@/components/common/key-value-display";
import SimpleSkeleton from "@/components/common/simple-skeleton";
import PartnershipRequestApproveSection from "@/components/partnership-request/approve-section";
import PartnershipRequestDocs from "@/components/partnership-request/documentation";
import PartnershipRequestRejectRevertSection from "@/components/partnership-request/reject-revert-section";
import PartnershipRequestRejectSection from "@/components/partnership-request/reject-section";
import ServiceApproval from "@/components/partnership-request/service-approval";
import PartnershipRequestStatus from "@/components/partnership-request/status";
import { db } from "@/db";
import { paths } from "@/paths";
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
  const company = request.partnerEmployee.company!;

  return (
    <div className="my-20 space-y-10">
      <section>
        <BreadCrumbs
          items={[
            { label: "Admin", href: paths.admin() },
            {
              label: "All Partnership Request",
              href: paths.partnershipRequest(),
            },
            {
              label: `${company.name}'s request`,
              href: paths.partnershipRequest(),
            },
          ]}
        />
      </section>

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
              { key: "Remark", value: request.remark },
            ]}
          />
        </div>
      </section>

      <Suspense fallback={<SimpleSkeleton />}>
        <ServiceApproval
          approvedServices={request.approvedServices}
          request={request}
        />
      </Suspense>

      <PartnershipRequestDocs request={request} />

      {/* <Divider />
      <section>
        <h2 className="text-2xl mb-4">Comments</h2>
        <PartnershipRequestComments />
      </section> */}

      <PartnershipRequestApproveSection request={request} />
      <PartnershipRequestRejectSection request={request} />
      <PartnershipRequestRejectRevertSection request={request} />
    </div>
  );
}
