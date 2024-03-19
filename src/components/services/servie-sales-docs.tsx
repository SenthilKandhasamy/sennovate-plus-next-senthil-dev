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
