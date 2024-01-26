import { User } from "@prisma/client";
import ApplicationApproveBtn from "./application-approve-btn";
import ApplicationApproveForm from "./application-approve-form";
import ApplicationRejectBtn from "./application-reject-btn";

export default function ApplicationAction({ user }: { user: User }) {
  switch (user.applicationStatus) {
    case "Submitted":
      return (
        <div className="space-x-4">
          <ApplicationApproveBtn user={user}>
            <ApplicationApproveForm userId={user.id} />
          </ApplicationApproveBtn>
          <ApplicationRejectBtn user={user} />
        </div>
      );

    default:
      null;
  }
}
