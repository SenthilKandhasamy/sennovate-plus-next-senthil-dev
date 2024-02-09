"use server";
import { db } from "@/db";
import { isDatabaseUniqueConstraintError } from "@/error";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  companyName: z.string(),
  companyCountry: z.string(),
  companyState: z.string().optional(),
  employeeName: z.string(),
  employeeJobTitle: z.string(),
  employeeEmail: z.string(),
  employeePhone: z
    .string()
    .regex(
      /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      "Please enter a valid phone number"
    ),
  remark: z.string().optional(),
});

export type FormType = z.infer<typeof formSchema>;

export type FormState = {
  errors: { [Property in keyof FormType]?: string[] } & {
    _form?: string[];
  };
};

export async function createPartnershipRequest(
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  const result = formSchema.safeParse({
    companyName: formData.get("companyName") || undefined,
    companyCountry: formData.get("companyCountry") || undefined,
    companyState: formData.get("companyState") || undefined,
    employeeName: formData.get("employeeName") || undefined,
    employeeJobTitle: formData.get("employeeJobTitle") || undefined,
    employeeEmail: formData.get("employeeEmail") || undefined,
    employeePhone: formData.get("employeePhone") || undefined,
    remark: formData.get("remark") || undefined,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await db.partnershipRequest.create({
      data: {
        requestedFor: "Reseller",
        remark: result.data.remark,
        partnerEmployee: {
          create: {
            email: result.data.employeeEmail,
            jobTitle: result.data.employeeJobTitle,
            name: result.data.employeeName,
            phone: result.data.employeePhone,
            company: {
              connectOrCreate: {
                create: {
                  name: result.data.companyName,
                  country: result.data.companyCountry,
                  state: result.data.companyState,
                },
                where: {
                  name: result.data.companyName,
                },
              },
            },
          },
        },
      },
    });
  } catch (error) {
    if (isDatabaseUniqueConstraintError(error, "email")) {
      return {
        errors: {
          _form: ["Email is in use"],
        },
      };
    }

    console.log(error);
    return {
      errors: {
        _form: ["Something went wrong"],
      },
    };
  }

  return redirect("/post-partner-registration");
}
