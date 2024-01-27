import { db } from "@/db";
import { paths } from "@/paths";
import * as mainApi from "@/sennovate-main-api";
import { ApprovedService } from "@prisma/client";
import { revalidatePath } from "next/cache";
import ServiceApprovalTransfer from "./service-approval-transfer";

interface Props {
  approvedServices: ApprovedService[];
  requestId: string;
}

export default async function ServiceApproval({
  requestId,
  approvedServices,
}: Props) {
  const availableServices = await mainApi.getService();

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
  );
}
