import ServiceOfferingTable from "@/components/services/service-offering-table";
import ServicePricing from "@/components/services/service-pricing";
import { getService } from "@/sennovate-main-api";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export default async function Service({ params: { slug } }: Props) {
  const service = (await getService({ slug }))[0];
  if (!service) notFound();

  return (
    <div className="my-20 space-y-10">
      <div className="max-w-prose text-center mx-auto">
        <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
        <p className="opacity-85">{service.excerpt}</p>
      </div>

      <div className="max-w-screen-md mx-auto">
        {service.tables.map((table) => {
          return (
            <div key={table.heading} className="space-y-5">
              {table.offerings.map((offering) => (
                <ServiceOfferingTable
                  key={offering.heading}
                  offering={offering}
                />
              ))}
            </div>
          );
        })}
      </div>

      <div className="max-w-screen-md mx-auto">
        <h2 className="text-2xl mb-4 font-bold">Pricing</h2>
        <ServicePricing service={service} />
      </div>
    </div>
  );
}
