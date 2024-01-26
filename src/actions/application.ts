"use server";
import * as aws from "@/aws";
import { db } from "@/db";
import { paths } from "@/paths";
import { redirect } from "next/navigation";

export async function approveApplication(formData: FormData) {
  // console.log(formData.get("priceFactor"));

  const userId = formData.get("userId") as string;
  const serviceSlugs = formData.getAll("approvedServices") as any[];

  try {
    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        applicationStatus: "Approved",
        approvedServices: {
          createMany: {
            data: serviceSlugs.map((s) => ({
              serviceSlug: s,
            })),
            skipDuplicates: true,
          },
        },
      },
    });

    await aws.adminCreateUser({
      email: user.companyEmail,
    });
  } catch (error) {
    console.log(error);
  }

  redirect(`${paths.partnerShipApplication()}/${userId}`);
}

export async function rejectApplication(userId: string) {
  try {
    const user = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return {
        _form: ["User not found"],
      };
    }

    if (user.applicationStatus === "Rejected") {
      return {
        _form: ["Application already rejected"],
      };
    }

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        applicationStatus: "Rejected",
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        _form: [error.message],
      };
    }
  }
}
