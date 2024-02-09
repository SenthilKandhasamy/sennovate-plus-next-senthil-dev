"use server";

import { db } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";

export async function revertRejectPartnershipRequest(
  formState: { error?: string },
  {
    requestId,
  }: {
    requestId: string;
  }
) {
  try {
    await db.partnershipRequest.update({
      where: { id: requestId },
      data: {
        status: "Submitted",
      },
    });
    revalidatePath(paths.partnershipRequest(requestId));
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
  return {};
}
