"use client";
import { rejectPartnershipRequest } from "@/actions/reject-partnership-request";
import { Button, Checkbox } from "@nextui-org/react";
import { PartnershipRequest } from "@prisma/client";
import { useState } from "react";
import { toast } from "react-toastify";

export default function PartnershipRequestRejectSection({
  request,
}: {
  request: PartnershipRequest;
}) {
  const [checked, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  function handlePress() {
    setLoading(true);
    rejectPartnershipRequest({}, request.id)
      .then((d) => {
        if (d.error)
          toast(d.error, {
            type: "error",
          });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (request.status === "Rejected" || request.status === "Approved")
    return null;

  return (
    <section className="border-1 border-danger-100 p-8 rounded-lg">
      <h2 className="text-2xl mb-4 text-danger-300">Reject Request</h2>

      <div className="flex flex-col gap-4 items-start">
        <Checkbox
          checked={checked}
          onValueChange={setCheck}
          className="opacity-70"
        >
          Proceed with Request Rejection
        </Checkbox>
        <Button
          color="danger"
          size="lg"
          isDisabled={!checked}
          isLoading={loading}
          onClick={handlePress}
        >
          Reject
        </Button>
      </div>
    </section>
  );
}
