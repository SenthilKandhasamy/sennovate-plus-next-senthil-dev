"use server";

import * as aws from "@/aws";
import { db } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";

export async function approvePartnershipRequest(
  formState: { error?: string },
  {
    employeeId,
    requestId,
  }: {
    employeeId: string;
    requestId: string;
  }
) {
  try {
    const partnerEmployee = await db.partnerEmployee.findFirst({
      where: { id: employeeId },
    });

    if (!partnerEmployee)
      throw new Error("Partner Employee not found with id " + employeeId);

    await aws.adminCreateUser({
      email: partnerEmployee.email,
    });

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
