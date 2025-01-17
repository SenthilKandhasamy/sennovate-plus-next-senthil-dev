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

  if (request.status === "Approved" || request.status === "Rejected")
    return null;

  return (
    <section className="border-1 border-success-100 p-8 rounded-lg">
      <h2 className="text-2xl mb-4 text-success-300">Approve Request</h2>
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
    </section>
  );
}
