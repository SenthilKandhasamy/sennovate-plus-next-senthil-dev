"use client";

import { approvePartnershipRequest } from "@/actions/approve-partnership-request";
import { Button } from "@nextui-org/react";
import { PartnershipRequest } from "@prisma/client";
import { useState } from "react";
import { toast } from "react-toastify";

export default function PartnershipRequestApproveSection({
  request,
}: {
  request: PartnershipRequest;
}) {
  const [loading, setLoading] = useState(false);
  const documentationsDone =
    request.ndaSigned && request.msaSigned && request.resellerAgreementSigned;

  switch (request.status) {
    case "Approved":
      return <div className="opacity-70">Already Approved</div>;
    case "Rejected":
      return <div className="opacity-70">Already Rejected</div>;

    default:
      return (
        <div>
          {!documentationsDone && (
            <p className="my-2 opacity-70">Documentations Incomplete</p>
          )}
          <Button
            isDisabled={!documentationsDone}
            color="success"
            size="lg"
            isLoading={loading}
            onPress={() => {
              setLoading(true);
              approvePartnershipRequest(
                {},
                {
                  employeeId: request.partnerEmployeeId,
                  requestId: request.id,
                }
              )
                .then((d) => {
                  if (d.error)
                    toast(d.error, {
                      type: "error",
                    });
                })
                .finally(setLoading.bind(null, false));
            }}
          >
            Approve
          </Button>
        </div>
      );
  }
}
