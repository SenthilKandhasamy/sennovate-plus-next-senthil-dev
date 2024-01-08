import ServiceCategory from "@/components/services/service-category";
import ServiceCard from "@/components/services/servie-card";
import WithAuthentication from "@/components/with-authentication";
import { paths } from "@/paths";

const services = [
  {
    name: "IAM as a Service",
    description:
      "The ensuing table delineates the framework for Identity and Access Management as a Service (IAMaaS), crafted in accordance with prevalent use cases catering to the majority of clients.",
  },
  {
    name: "SOC as a Service (Open XDR)",
    description:
      "Security Operations as a Service aims to be your SOC partner, delivering comprehensive SOC services. This involves 24x7 security operations utilizing an AI/ML-driven Open XDR platform and managing Managed Detection and Response (MDR) through a world-class EDR (Endpoint Detection and Response) platform.",
  },
  {
    name: "MDR as a Service powered by EDR",
    description:
      "Sennovate's MDR as a Service leverages an EDR platform, complemented by Sennovate+'s innovative service delivery, providing comprehensive MDR solutions for your endpoints.",
  },
];

export default function Home() {
  return (
    <WithAuthentication>
      <div className="my-20">
        <h2 className="text-3xl mb-12">Types of Services</h2>
        <div className="space-y-20">
          <ServiceCategory name="IAM as a Service">
            <ServiceCard
              name="IAM"
              description="The ensuing table delineates the framework for Identity and Access Management as a Service (IAMaaS), crafted in accordance with prevalent use cases catering to the majority of clients."
              pricingPage={paths.serviceCategory("iam")}
            />
          </ServiceCategory>
          <ServiceCategory name="Security Operations as a Service (Open XDR and EDR)">
            <ServiceCard
              name="SOC as a Service powered by Open XDR"
              description="Sennovate's SOC as a Service leverages the cutting-edge Open XDR platform powered with AI/ML, complemented by Sennovate+'s innovative service delivery. This integration provides a comprehensive 360-degree security insight into your entire enterprise, addressing the needs of both technical teams and executive leadership, thereby ensuring a peace of mind."
              pricingPage="#"
            />
            <ServiceCard
              name="MDR as a Service powered by EDR"
              description="Sennovate's MDR as a Service leverages an EDR platform, complemented by Sennovate+'s innovative service delivery, providing comprehensive MDR solutions for your endpoints."
              pricingPage="#"
            />
          </ServiceCategory>
          <ServiceCategory name="INFRASTRUCTURE MANAGEMENT as a Service">
            <ServiceCard
              name="OS Administration as a Service"
              description=""
              pricingPage="#"
            />
            <ServiceCard
              name="Patch management as a Service"
              description=""
              pricingPage="#"
            />
            <ServiceCard
              name="Cloud Infrastructure Management as a Service"
              description=""
              pricingPage="#"
            />
          </ServiceCategory>

          <ServiceCategory name="Other Services">
            <ServiceCard
              name="ETP as a Service"
              description=""
              pricingPage="#"
            />
            <ServiceCard
              name="SAT as a Service"
              description=""
              pricingPage="#"
            />
            <ServiceCard
              name="DLP as a Service"
              description=""
              pricingPage="#"
            />
            <ServiceCard
              name="Assessment as-a Service"
              description=""
              pricingPage="#"
            />
          </ServiceCategory>
        </div>
      </div>
    </WithAuthentication>
  );
}
