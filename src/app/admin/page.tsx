import { Button } from "@nextui-org/react";
import Link from "next/link";
export default async function Admin() {
  return (
    <div className="my-20">
      <Button as={Link} href="/admin/partnership-request">
        Partnership Requests
      </Button>
    </div>
  );
}
