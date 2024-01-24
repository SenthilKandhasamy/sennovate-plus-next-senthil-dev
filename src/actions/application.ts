"use server";
import { db } from "@/db";

export async function approveApplication(userId: string) {
  let errMsg;

  try {
    const user = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      errMsg = "User not Found";
    }

    if (user?.applicationStatus === "Approved") {
      errMsg = "Already Approved";
    }

    // TODO
    // Create the user in cognito
    console.log("Updating Cognito");

    // Update the user Application status
    await db.user.update({
      where: { id: user?.id },
      data: {
        applicationStatus: "Approved",
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      errMsg = err.message;
    }
  }

  if (errMsg)
    return {
      _form: [errMsg],
    };
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
