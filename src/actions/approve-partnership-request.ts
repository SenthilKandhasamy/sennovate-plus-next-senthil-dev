"use server";

import { db } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";

export async function approvePartnershipRequest(
  formState: { error?: string },
  requestId: string
) {
  try {
    await db.partnershipRequest.update({
      where: { id: requestId },
      data: {
        status: "Approved",
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
