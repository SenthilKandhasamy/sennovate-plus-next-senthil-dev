import { getServerSession } from "@/auth";
import ServiceCard from "@/components/services/servie-card";
import { db } from "@/db";
import { paths } from "@/paths";
import * as sennovateMain from "@/sennovate-main-api";
import { getUserType } from "@/user-type";
import { Divider } from "@nextui-org/react";
import Link from "next/link";

export default async function ApprovedServices() {
  let allServices = await sennovateMain.getService();
  let servicefalse = await sennovateMain.getServicefalse();
  
  const session = await getServerSession();
  if (!session) return null;
  const isAdmin = getUserType(session.user.roles) === "admin";
  const isDirectSales = getUserType(session.user.roles) === "direct-sales";

  if (!isAdmin && !isDirectSales) {
    const partnershipRequest = await db.partnershipRequest.findFirst({
      where: {
        partnerEmployeeId: session.user.id,
      },
      select: {
        approvedServices: true,
      },
    });

    allServices = allServices.filter((s) =>
      partnershipRequest?.approvedServices.find(
        (approvedS) => approvedS.slug === s.slug
      )
    );
  }
// Extracting unique groupings from allServices array
const groupings = [...new Set(allServices.map(service => service.grouping))];
	
  return (
    <div className="my-20 space-y-10">
      {!isAdmin && !isDirectSales && (
        <>
          <h1 className="font-bold text-3xl">Approved Services </h1>
          <Divider className="mt-4 mb-12" />
        </>
      )}	    

<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
  {allServices.filter((service) => service.grouping === "IAM").length > 0 && (
  <h2 className="font-bold text-xl">Identity and Access Management</h2>
)}
  	<div /> {/* Empty div for line break */}
	<div /> {/* Empty div for line break */}
  {allServices.filter((service) => service.grouping === "IAM").map((filteredService) => (
    <ServiceCard
      key={filteredService.slug}
      name={filteredService.title}
      description={filteredService.excerpt}
      pricingPage={paths.service(filteredService.slug)}
    />
  ))}
</div>

<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
 {allServices.filter((service) => service.grouping === "SOC").length > 0 && (
  <h2 className="font-bold text-xl">Cyber Security</h2>
)}
  	<div /> {/* Empty div for line break */}
	<div /> {/* Empty div for line break */}
  {allServices.filter((service) => service.grouping === "SOC").map((filteredService) => (
    <ServiceCard
      key={filteredService.slug}
      name={filteredService.title}
      description={filteredService.excerpt}
      pricingPage={paths.service(filteredService.slug)}
    />
  ))}
</div>

<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
 {allServices.filter((service) => service.grouping === "Infra").length > 0 && (
  <h2 className="font-bold text-xl">Infrastructure</h2>
)}
  	<div /> {/* Empty div for line break */}
	<div /> {/* Empty div for line break */}
  {allServices.filter((service) => service.grouping === "Infra").map((filteredService) => (
    <ServiceCard
      key={filteredService.slug}
      name={filteredService.title}
      description={filteredService.excerpt}
      pricingPage={paths.service(filteredService.slug)}
    />
  ))}
</div>
	    
	    <Divider className="mt-4 mb-12" />
	    <h1 className="font-bold text-3xl">Documents</h1>
	    <ul className="list-inside list-disc">
		    {servicefalse[0].salesDocs.map((doc) => (
              <Link key={doc.title} href={doc.media} target="_blank">
                <li className="text-primary-500 text-lg">{doc.title}</li>
              </Link>
            ))}
                 
            </ul>
    </div>
	
  );
}
