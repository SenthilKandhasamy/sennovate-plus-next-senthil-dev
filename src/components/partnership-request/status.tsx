import { Chip } from "@nextui-org/react";
import { PartnershipRequestStatus as PartnershipRequestStatusType } from "@prisma/client";

export default function PartnershipRequestStatus({
  status,
}: {
  status: PartnershipRequestStatusType;
}) {
  switch (status) {
    case "Submitted":
      return <Chip color="warning">Submitted</Chip>;
    case "UnderProcess":
      return <Chip color="default">Under Process</Chip>;
    case "Approved":
      return <Chip color="success">Approved</Chip>;
    case "Rejected":
      return <Chip color="danger">Rejected</Chip>;

    default:
      null;
  }
}
