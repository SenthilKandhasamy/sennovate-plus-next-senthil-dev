import { getServerSession } from "@/auth";
import ServiceCard from "@/components/services/servie-card";
import { db } from "@/db";
import { paths } from "@/paths";
import * as sennovateMain from "@/sennovate-main-api";
import { Divider } from "@nextui-org/react";

export default async function ApprovedServices() {
  const session = await getServerSession();
  const allServices = await sennovateMain.getService();

  const user = await db.user.findFirst({
    where: {
      companyEmail: session?.user.email + "",
    },
    select: {
      approvedServices: {
        select: {
          serviceSlug: true,
        },
      },
    },
  });

  const approvedServices = allServices.filter((service) => {
    if (user?.approvedServices.find((s) => s.serviceSlug === service.slug))
      return true;
  });

  return (
    <div className="my-20">
      <h1 className="font-bold text-3xl">Approved Services</h1>
      <Divider className="mt-4 mb-12" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {approvedServices.map((service) => (
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
