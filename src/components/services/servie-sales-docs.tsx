import { Service } from "@/sennovate-main-api/service.type";
import { UserType } from "@/user-type";
import Link from "next/link";

interface Props {
  service: Service;
  userType: UserType;
}

export default function ServiceSalesDocs({ service, userType }: Props) {
  switch (userType) {
    case "admin":
      return (
        <div className="space-y-4">
          <div>
            <!-- <h2 className="mb-2 opacity-80">Common Sales Docs.</h2> -->
            <ul className="list-inside list-disc">
              {service.salesDocs
                .filter((s) => s.for === "all")
                .map((doc) => (
                  <Link key={doc.title} href={doc.media} target="_blank">
                    <li className="text-primary-500 text-lg">{doc.title}</li>
                  </Link>
                ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-2 opacity-80">Sales Docs for Direct Sales</h2>
            <ul className="list-inside list-disc">
              {service.salesDocs
                .filter((s) => s.for === "directSales")
                .map((doc) => (
                  <Link key={doc.title} href={doc.media} target="_blank">
                    <li className="text-primary-500 text-lg">{doc.title}</li>
                  </Link>
                ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-2 opacity-80">Sales Docs for Reseller</h2>
            <ul className="list-inside list-disc">
              {service.salesDocs
                .filter((s) => s.for === "reseller")
                .map((doc) => (
                  <Link key={doc.title} href={doc.media} target="_blank">
                    <li className="text-primary-500 text-lg">{doc.title}</li>
                  </Link>
                ))}
            </ul>
          </div>
        </div>
      );

    case "direct-sales":
      return (
        <ul className="list-inside list-disc">
          {service.salesDocs
            .filter((s) => s.for === "directSales" || s.for === "all")
            .map((doc) => (
              <Link key={doc.title} href={doc.media} target="_blank">
                <li className="text-primary-500 text-lg">{doc.title}</li>
              </Link>
            ))}
        </ul>
      );

    case "user":
      return (
        <ul className="list-inside list-disc">
          {service.salesDocs
            .filter((s) => s.for === "reseller" || s.for === "all")
            .map((doc) => (
              <Link key={doc.title} href={doc.media} target="_blank">
                <li className="text-primary-500 text-lg">{doc.title}</li>
              </Link>
            ))}
        </ul>
      );

    default:
      return <div></div>;
  }
}
