import { getServerSession } from "@/auth";
import ServiceCard from "@/components/services/servie-card";
import { db } from "@/db";
import { paths } from "@/paths";
import * as sennovateMain from "@/sennovate-main-api";
import { getUserType } from "@/user-type";
import { Divider } from "@nextui-org/react";
import Link from "next/link";
import React from "react"; // Don't forget to import React

export default async function ApprovedServices() {
  let allServices = await sennovateMain.getService();
  let servicefalse = await sennovateMain.getServicefalse();

  const session = await getServerSession();
  if (!session) return null;
  const isAdmin = getUserType(session.user.roles) === "admin";
  const isDirectSales = getUserType(session.user.roles) === "direct-sales";
  const isEmployee = getUserType(session.user.roles) === "employee";

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
  const groupings = [...new Set(allServices.map((service) => service.grouping))];

  return (
    <div className="my-20 space-y-10">
      {!isAdmin && !isDirectSales && (
        <>
          <h1 className="font-bold text-3xl">Approved Services </h1>
          <Divider className="mt-4 mb-12" />
        </>
      )}

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {/* Looping over the array of unique groupings */}
        {groupings.map((group, index) => (
          <div key={index}>
            {allServices.filter((service) => service.grouping === group).length > 0 && (
              <>
                <h2 className="font-bold text-xl">{group}</h2>
                {/* Mapping over filtered services to render ServiceCard components */}
                {allServices
                  .filter((service) => service.grouping === group)
                  .map((filteredService) => (
                    <ServiceCard
                      key={filteredService.slug}
                      name={filteredService.title}
                      description={filteredService.excerpt}
                      pricingPage={paths.service(filteredService.slug)}
                    />
                  ))}
              </>
            )}
            {/* Check if it's not the last group before adding line breaks */}
            {index !== groupings.length - 1 && <><div /><div /></>}
          </div>
        ))}
      </div>

      {/* Render DocumentList */}
      <DocumentList servicefalse={servicefalse} session={session} />
    </div>
  );
}

const DocumentList = ({ servicefalse, session }) => {
  // Assuming getUserType and session are defined properly
  const userType = getUserType(session.user.roles);
  let filteredDocs;

  if (userType === "admin") {
    filteredDocs = servicefalse[0].salesDocs;
  } else if (userType === "direct-sales") {
    filteredDocs = servicefalse[0].salesDocs.filter((doc) => doc.for === "Reseller");
  } else {
    filteredDocs = servicefalse[0].salesDocs.filter((doc) => doc.for === "Direct Sales");
  }

  return (
    <div>
      <h1 className="font-bold text-3xl">Documents</h1>
      <ul className="list-inside list-disc">
        {filteredDocs.map((doc) => (
          <li key={doc.title}>
            <Link href={doc.media} target="_blank" className="text-primary-500 text-lg">
              {doc.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
