import PartnershipRequestStatus from "@/components/partnership-request/status";
import PartnershipRequestTable from "@/components/partnership-request/table";
import { db } from "@/db";
import { Divider } from "@nextui-org/react";

interface PageProps {
  searchParams?: { [key: string]: string | undefined };
}

export default async function PartnershipRequests({ searchParams }: PageProps) {
  let take = 10;
  let skip = 0;
  if (searchParams?.page) {
    skip = (+searchParams.page - 1) * take;
  }

  const [requests, count] = await db.$transaction([
    db.partnershipRequest.findMany({
      take,
      skip,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        status: true,
        requestedFor: true,
        partnerEmployee: {
          select: {
            name: true,
            company: {
              select: {
                name: true,
                country: true,
              },
            },
          },
        },
      },
    }),
    db.partnershipRequest.count(),
  ]);

  const columns = [
    { key: "status", label: "Status" },
    { key: "requestedFor", label: "Requested For" },
    { key: "name", label: "Name" },
    { key: "company", label: "Company" },
    { key: "country", label: "Country" },
  ];

  const rows = requests.map((request) => ({
    key: request.id,
    requestedFor: request.requestedFor,
    status: <PartnershipRequestStatus status={request.status} />,
    name: request.partnerEmployee.name,
    company: request.partnerEmployee.company?.name,
    country: request.partnerEmployee.company?.country,
  }));

  return (
    <div className="my-20 space-y-10">
      <section>
        <h1 className="text-2xl font-bold text-center">Partnership Requests</h1>
      </section>
      <Divider className="my-4" />
      <section>
        <PartnershipRequestTable
          columns={columns}
          rows={rows}
          total={count}
          perPage={take}
        />
      </section>
    </div>
  );
}
