import KeyValueDisplay from "@/components/common/key-value-display";
import { db } from "@/db";
import * as mainApi from "@/sennovate-main-api";
import { Divider } from "@nextui-org/react";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export default async function ApplicationApprove({ params }: PageProps) {
  const services = await mainApi.getService();
  const userId = params.id;
  const user = await db.user.findFirst({
    where: { id: userId },
    select: {
      companyName: true,
      firstName: true,
      lastName: true,
      remark: true,
      partnershipType: true,
    },
  });

  if (!user) return notFound();

  return (
    <div className="my-20 space-y-10">
      <section className="max-w-screen-md">
        <h1 className="text-2xl mb-4 font-bold">Request Approval Process</h1>
        <KeyValueDisplay
          heading="Details"
          pairs={[
            {
              key: "Requested For",
              value: (
                <span className="text-primary-500 text-lg">
                  {user.partnershipType}
                </span>
              ),
            },
            { key: "Company", value: user.companyName },
            { key: "Name", value: `${user.firstName} ${user.lastName}` },
            { key: "Remark", value: user.remark },
          ]}
        />
      </section>
      <Divider />
      <section>Hello There</section>
    </div>
  );
}
