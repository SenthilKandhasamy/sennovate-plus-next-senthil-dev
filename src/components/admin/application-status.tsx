import { Chip } from "@nextui-org/react";
import { PartnershipApplicationStatus } from "@prisma/client";

export default function ApplicationStatus({
  status,
}: {
  status: PartnershipApplicationStatus;
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
