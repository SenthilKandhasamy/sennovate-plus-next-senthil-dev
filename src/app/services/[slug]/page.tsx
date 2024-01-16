import ServiceOfferingTable from "@/components/services/service-offering-table";
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
    <div className="mt-10">
      <h1 className="text-2xl">{service.title}</h1>

      <div className="my-12">
        {service.tables.map((table) => {
          return (
            <div key={table.heading} className="space-y-4">
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
    </div>
  );
}
