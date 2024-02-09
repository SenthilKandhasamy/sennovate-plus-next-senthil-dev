import { Service } from "@/sennovate-main-api/service.type";
import { UserType } from "@/user-type";
import ACFTable from "../acf-table";

interface Props {
  service: Service;
  userType: UserType;
}

export default function ServicePricing({ service, userType }: Props) {
  if (!service.pricing || service.pricing.length < 1)
    return <div className="opacity-60">Price Not Found</div>;

  switch (userType) {
    case "direct-sales":
      return (
        <div className="space-y-4">
          {service.priceTables
            .filter((t) => t.for === "directSales")
            .map((table, i) => (
              <ACFTable key={i} table={table.table} />
            ))}
        </div>
      );

    case "user":
      return (
        <div className="space-y-4">
          {service.priceTables
            .filter((t) => t.for === "reseller")
            .map((table, i) => (
              <ACFTable key={i} table={table.table} />
            ))}
        </div>
      );

    case "admin":
      return (
        <div className="space-y-8">
          <div>
            <h2 className="mb-2 opacity-80">Pricing for Direct Sales</h2>
            <div className="space-y-4">
              {service.priceTables
                .filter((t) => t.for === "directSales")
                .map((table, i) => (
                  <ACFTable key={i} table={table.table} />
                ))}
            </div>
          </div>
          <div>
            <h2 className="mb-2 opacity-80">Pricing for Reseller</h2>
            <div className="space-y-4">
              {service.priceTables
                .filter((t) => t.for === "reseller")
                .map((table, i) => (
                  <ACFTable key={i} table={table.table} />
                ))}
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="opacity-60">
          You have to be a Partner to see the Pricing
        </div>
      );
  }
}
