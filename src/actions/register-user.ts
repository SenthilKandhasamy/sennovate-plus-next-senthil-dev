"use server";

import * as aws from "@/aws";
import { redirect } from "next/navigation";
import { z } from "zod";

const newUserSchema = z.object({
  email: z.string().email(),
  companyName: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  country: z.string().optional(),
  state: z.string().optional(),
  contactNumber: z.string().optional(),
});

interface RegisterUserFormState {
  errors: {
    email?: string[];
    companyName?: string[];
    firstName?: string[];
    lastName?: string[];
    country?: string[];
    state?: string[];
    contactNumber?: string[];
    _form?: string[];
  };
}

export async function registerUser(
  formState: RegisterUserFormState,
  formData: FormData
): Promise<RegisterUserFormState> {
  function getFormData<K extends keyof z.infer<typeof newUserSchema>>(key: K) {
    return formData.get(key);
  }

  const result = newUserSchema.safeParse({
    email: getFormData("email"),
    companyName: getFormData("companyName"),
    firstName: getFormData("firstName"),
    lastName: getFormData("lastName"),
    country: getFormData("country"),
    state: getFormData("state"),
    contactNumber: getFormData("contactNumber"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await aws.adminCreateUser({ email: result.data.email });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }
  redirect("/post-registration");
}
