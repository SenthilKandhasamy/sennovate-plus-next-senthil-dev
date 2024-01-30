import { db } from "@/db";
import { paths } from "@/paths";
import { Checkbox } from "@nextui-org/react";
import { PartnershipRequest } from "@prisma/client";
import { revalidatePath } from "next/cache";
import FormSubmitButton from "../common/form-submit-button";

export default function PartnershipRequestDocs({
  request,
}: {
  request: PartnershipRequest;
}) {
  async function handleSubmit(formData: FormData) {
    "use server";

    try {
      await db.partnershipRequest.update({
        where: { id: request.id },
        data: {
          ndaSigned: formData.get("ndaSigned") !== null,
          msaSigned: formData.get("msaSigned") !== null,
          resellerAgreementSigned:
            formData.get("resellerAgreementSigned") !== null,
        },
      });
    } catch (error) {
      console.log(error);
    }
    revalidatePath(paths.partnershipRequest(request.id));
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-2 items-start">
      <Checkbox name="ndaSigned" defaultSelected={request.ndaSigned}>
        NDA Signed
      </Checkbox>
      <Checkbox name="msaSigned" defaultSelected={request.msaSigned}>
        MSA Signed
      </Checkbox>
      <Checkbox
        name="resellerAgreementSigned"
        defaultSelected={request.resellerAgreementSigned}
      >
        Reseller Agreement Signed
      </Checkbox>
      <FormSubmitButton color="success">Update</FormSubmitButton>
    </form>
  );
}