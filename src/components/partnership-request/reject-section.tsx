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

  switch (request.status) {
    case "Approved":
      return <div className="opacity-70">Already Approved</div>;
    case "Rejected":
      return <div className="opacity-70">Already Rejected</div>;

    default:
      return (
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
      );
  }
}
