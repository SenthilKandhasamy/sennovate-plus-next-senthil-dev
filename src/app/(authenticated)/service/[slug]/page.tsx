import { getServerSession } from "@/auth";
import BreadCrumbs from "@/components/breadcrumbs";
import ServiceOfferingTable1 from "@/components/services/service-offering-table";
import ServicePricing from "@/components/services/service-pricing";
import ServiceSalesDocs from "@/components/services/servie-sales-docs";
import { paths } from "@/paths";
import { getService } from "@/sennovate-main-api";
import { getUserType } from "@/user-type";
import { Divider } from "@nextui-org/react";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export default async function Service({ params: { slug } }: Props) {
  const session = await getServerSession();
  const userType = getUserType(session?.user.roles);
  const service = (await getService({ slug }))[0];
  if (!service) notFound();

  return (
    <div className="my-20 space-y-10">
      <section className="container max-w-screen-md mb-20">
        <BreadCrumbs
          items={[
            { label: "Services", href: paths.service() },
            { label: service.title },
          ]}
        />
      </section>

      <section className="container max-w-prose text-center">
        <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
        <p className="opacity-85">{service.excerpt}</p>
      </section>

      {service.preferredLogos.length > 0 && (
        <>
          <Divider />
          <section className="container max-w-screen-md">
            <h1 className="text-2xl font-bold mb-4">Preferred</h1>
            <div className="grid md:grid-cols-4 gap-5">
              {service.preferredLogos.map((l) => (
                <div
                  key={l.title}
                  className="rounded-md overflow-hidden bg-white p-2"
                >
                  <img
                    src={l.logo}
                    alt={l.title}
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <Divider />
      <section className="container max-w-screen-md">
        {service.tables.map((table) => {
          return (
            <div key={table.heading} className="space-y-5">
              {table.offerings.map((offering) => (
                <ServiceOfferingTable1
                  key={offering.heading}
                  offering={offering}
                />
              ))}
            </div>
          );
        })}
      </section>

      <Divider />

      <section className="container max-w-screen-md">
        <h2 className="text-2xl mb-4 font-bold">Pricing</h2>
        <ServicePricing service={service} userType={userType} />
      </section>

      {service.byoLogos.length > 0 && (
        <>
          <Divider />
          <section className="container max-w-screen-md">
            <h1 className="text-2xl font-bold mb-4">Bring Your Own</h1>
            <div className="grid md:grid-cols-4 gap-5">
              {service.byoLogos.map((l) => (
                <div
                  key={l.title}
                  className="rounded-md overflow-hidden bg-white p-2"
                >
                  <img
                    src={l.logo}
                    alt={l.title}
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {service.salesDocs.length > 0 && (
        <>
          <Divider />
          <section className="container max-w-screen-md">
            <h1 className="text-2xl font-bold mb-4">Sales Documents</h1>
            <ServiceSalesDocs service={service} userType={userType} />
          </section>
        </>
      )}
    </div>
  );
}
