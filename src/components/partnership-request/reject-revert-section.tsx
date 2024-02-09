"use client";

import { revertRejectPartnershipRequest } from "@/actions/revert-reject-partnership-request";
import { Button } from "@nextui-org/react";
import { PartnershipRequest } from "@prisma/client";
import { useState } from "react";
import { toast } from "react-toastify";

export default function PartnershipRequestRejectRevertSection({
  request,
}: {
  request: PartnershipRequest;
}) {
  const [loading, setLoading] = useState(false);
  if (request.status !== "Rejected") return null;

  return (
    <section className="border-1 border-success-100 p-8 rounded-lg">
      <h2 className="text-2xl mb-4 text-success-300">Revert Rejection</h2>
      <div>
        <Button
          color="success"
          size="lg"
          isLoading={loading}
          onPress={() => {
            setLoading(true);
            revertRejectPartnershipRequest(
              {},
              {
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
          Revert
        </Button>
      </div>
    </section>
  );
}
