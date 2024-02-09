import { db } from "@/db";
import { paths } from "@/paths";
import * as mainApi from "@/sennovate-main-api";
import { Divider } from "@nextui-org/react";
import { ApprovedService, PartnershipRequest } from "@prisma/client";
import { revalidatePath } from "next/cache";
import ServiceApprovalTransfer from "./service-approval-transfer";

interface Props {
  approvedServices: ApprovedService[];
  request: PartnershipRequest;
}

export default async function ServiceApproval({
  request,
  approvedServices,
}: Props) {
  if (request.status === "Rejected") return null;

  const availableServices = await mainApi.getService();
  const requestId = request.id;

  async function approve(slugs: string[]) {
    "use server";

    try {
      await db.approvedService.createMany({
        skipDuplicates: true,
        data: slugs.map((slug) => ({
          slug,
          requestId,
        })),
      });
    } catch (error) {
      console.log(error);
      return {
        error: "Something Went Wrong",
      };
    }

    revalidatePath(paths.partnershipRequest(requestId));
  }

  async function revert(slugs: string[]) {
    "use server";

    try {
      await db.approvedService.deleteMany({
        where: {
          slug: {
            in: slugs,
          },
        },
      });
    } catch (error) {
      console.log(error);
      return {
        error: "Something Went Wrong",
      };
    }

    revalidatePath(paths.partnershipRequest(requestId));
  }

  return (
    <>
      <Divider />
      <section>
        <h2 className="text-2xl mb-1">Service Approval</h2>
        <p className="opacity-70 mb-8">
          This will be effective once the request is approved
        </p>

        <ServiceApprovalTransfer
          availableServices={availableServices
            .map((s) => ({
              key: s.slug,
              label: s.title,
            }))
            .filter(
              (availableService) =>
                !approvedServices.find((s) => availableService.key === s.slug)
            )}
          approvedServices={availableServices
            .map((s) => ({
              key: s.slug,
              label: s.title,
            }))
            .filter((s) =>
              approvedServices.find(
                (approvedService) => approvedService.slug === s.key
              )
            )}
          approve={approve}
          revert={revert}
        />
      </section>
    </>
  );
}
