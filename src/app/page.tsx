import ServiceCategory from "@/components/services/service-category";
import ServiceCard from "@/components/services/servie-card";
import WithAuthentication from "@/components/with-authentication";
import { paths } from "@/paths";

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
              pricingPage={paths.service("iam-as-a-service")}
            />
          </ServiceCategory>
          <ServiceCategory name="Security Operations as a Service (Open XDR and EDR)">
            <ServiceCard
              name="SOC as a Service powered by Open XDR"
              description="Sennovate's SOC as a Service leverages the cutting-edge Open XDR platform powered with AI/ML, complemented by Sennovate+'s innovative service delivery. This integration provides a comprehensive 360-degree security insight into your entire enterprise, addressing the needs of both technical teams and executive leadership, thereby ensuring a peace of mind."
              pricingPage={paths.service(
                "soc-as-a-service-powered-by-open-xdr"
              )}
            />
            <ServiceCard
              name="MDR as a Service powered by EDR"
              description="Sennovate's MDR as a Service leverages an EDR platform, complemented by Sennovate+'s innovative service delivery, providing comprehensive MDR solutions for your endpoints."
              pricingPage={paths.service("soc-mdr")}
            />
          </ServiceCategory>
          <ServiceCategory name="INFRASTRUCTURE MANAGEMENT as a Service">
            <ServiceCard
              name="OS Administration as a Service"
              description=""
              pricingPage={paths.service("infra-os-administration")}
            />
            <ServiceCard
              name="Patch management as a Service"
              description=""
              pricingPage={paths.service("patch-management")}
            />
            <ServiceCard
              name="Cloud Infrastructure Management as a Service"
              description=""
              pricingPage={paths.service("cloud-infra-management")}
            />
          </ServiceCategory>

          <ServiceCategory name="Other Services">
            <ServiceCard
              name="ETP as a Service"
              description=""
              pricingPage={paths.service("etp")}
            />
            <ServiceCard
              name="SAT as a Service"
              description=""
              pricingPage={paths.service("sat")}
            />
            <ServiceCard
              name="DLP as a Service"
              description=""
              pricingPage={paths.service("dlp")}
            />
            <ServiceCard
              name="Assessment as-a Service"
              description=""
              pricingPage={paths.service("assessment")}
            />
          </ServiceCategory>
        </div>
      </div>
    </WithAuthentication>
  );
}
