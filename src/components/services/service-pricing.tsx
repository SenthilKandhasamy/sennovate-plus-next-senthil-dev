import { getServerSession } from "@/auth";
import { Service } from "@/sennovate-main-api/service.type";
import { getUserType } from "@/user-type";
import PriceGrid from "../price-grid";

interface Props {
  service: Service;
}

export default async function ServicePricing({ service }: Props) {
  const session = await getServerSession();

  if (!service.pricing || service.pricing.length < 1)
    return <div className="opacity-60">Price Not Found</div>;

  switch (getUserType(session?.user.roles)) {
    case "user":
      return (
        <PriceGrid
          prices={service.pricing.filter((p) => p.for === "reseller")}
        />
      );

    case "admin":
      return (
        <div className="space-y-8">
          <div>
            <h2 className="mb-2 opacity-80">Pricing for Reseller</h2>
            <PriceGrid
              prices={service.pricing.filter((p) => p.for === "reseller")}
            />
          </div>
          <div>
            <h2 className="mb-2 opacity-80">Pricing for Referral</h2>
            <PriceGrid
              prices={service.pricing.filter((p) => p.for === "referral")}
            />
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
