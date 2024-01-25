"use server";

import { db } from "@/db";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";

const userAttr = (attr: keyof User) => attr;

const newUserSchema = z.object<{ [Property in keyof User]?: any }>({
  companyEmail: z.string().email(),
  companyName: z.string().min(1),
  jobTitle: z.string().min(1),
  country: z.string().min(1).optional(),
  state: z.string().min(1).optional(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
  partnershipType: z.enum(["Referral", "Reseller"]),
  remark: z.string().optional(),
});

interface RegisterUserFormState {
  errors: { [Property in keyof User]?: string[] } & { _form?: string[] };
}

export async function registerUser(
  _formState: RegisterUserFormState,
  formData: FormData
): Promise<RegisterUserFormState> {
  function getFormData(key: keyof User) {
    return formData.get(key);
  }

  const result = newUserSchema.safeParse({
    [userAttr("companyEmail")]: getFormData("companyEmail"),
    [userAttr("companyName")]: getFormData("companyName"),
    [userAttr("jobTitle")]: getFormData("jobTitle"),
    [userAttr("country")]: getFormData("country"),
    [userAttr("state")]: getFormData("state"),
    [userAttr("firstName")]: getFormData("firstName"),
    [userAttr("lastName")]: getFormData("lastName"),
    [userAttr("phone")]: getFormData("phone"),
    [userAttr("partnershipType")]: getFormData("partnershipType"),
    [userAttr("remark")]: getFormData("remark"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const existingUser = await db.user.findFirst({
      where: { companyEmail: result.data.companyEmail },
    });
    if (existingUser) {
      return {
        errors: {
          _form: ["Email is already registered with us"],
        },
      };
    }

    await db.user.create({
      data: result.data as any,
    });
  } catch (error: unknown) {
    console.log(error);
    return {
      errors: {
        _form: ["Something went wrong"],
      },
    };
  }
  redirect("/post-registration");
}
