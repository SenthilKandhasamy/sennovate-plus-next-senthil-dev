import ServiceCard from "@/components/services/servie-card";
import WithAuthentication from "@/components/with-authentication";
import { paths } from "@/paths";
import * as sennovateApi from "@/sennovate-main-api";

export default async function Home() {
  const services = await sennovateApi.getService();

  return (
    <WithAuthentication>
      <div className="my-20">
        <h2 className="text-5xl my-12 font-bold">Our Services</h2>
        <div className="grid grid-cols-3 gap-5">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              name={service.title}
              description={service.excerpt}
              pricingPage={paths.service(service.slug)}
            />
          ))}
        </div>
      </div>
    </WithAuthentication>
  );
}
