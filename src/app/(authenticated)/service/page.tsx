import { getServerSession } from "@/auth";
import ServiceCard from "@/components/services/servie-card";
import { db } from "@/db";
import { paths } from "@/paths";
import * as sennovateMain from "@/sennovate-main-api";
import { getUserType } from "@/user-type";
import { Divider } from "@nextui-org/react";

export default async function ApprovedServices() {
  let allServices = await sennovateMain.getService();
  const session = await getServerSession();
  if (!session) return null;
  const isAdmin = getUserType(session.user.roles) === "admin";
  const isDirectSales = getUserType(session.user.roles) === "direct-sales";

  if (!isAdmin && !isDirectSales) {
    const partnershipRequest = await db.partnershipRequest.findFirst({
      where: {
        partnerEmployeeId: session.user.id,
      },
      select: {
        approvedServices: true,
      },
    });

    allServices = allServices.filter((s) =>
      partnershipRequest?.approvedServices.find(
        (approvedS) => approvedS.slug === s.slug
      )
    );
  }

  return (
    <div className="my-20 space-y-10">
      {!isAdmin && !isDirectSales && (
        <>
          <h1 className="font-bold text-3xl">Approved Services</h1>
          <Divider className="mt-4 mb-12" />
        </>
      )}

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {allServices.map((service) => (
          <ServiceCard
            key={service.slug}
            name={service.title}
            description={service.excerpt}
            pricingPage={paths.service(service.slug)}
          />
        ))}
      </div>
    </div>
  );
}
