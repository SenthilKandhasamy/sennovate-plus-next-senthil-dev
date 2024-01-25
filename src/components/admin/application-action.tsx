import { User } from "@prisma/client";
import ApplicationApproveBtn from "./application-approve-btn";
import ApplicationRejectBtn from "./application-reject-btn";

export default function ApplicationAction({ user }: { user: User }) {
  switch (user.applicationStatus) {
    case "Submitted":
      return (
        <div className="space-x-4">
          <ApplicationApproveBtn user={user} />
          <ApplicationRejectBtn user={user} />
        </div>
      );

    default:
      null;
  }
}
