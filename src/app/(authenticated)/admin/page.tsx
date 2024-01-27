import { paths } from "@/paths";
import { Button, Divider } from "@nextui-org/react";
import Link from "next/link";
export default async function Admin() {
  return (
    <div className="my-20 space-y-10">
      <section>
        <h2 className="mb-4 text-2xl font-bold">Partnership Request</h2>
        <Button color="primary" as={Link} href={paths.partnershipRequest()}>
          See All
        </Button>
      </section>
      <Divider />
      <section>
        <h2 className="mb-1 text-2xl font-bold">Services</h2>
        <p className="opacity-80 mb-4">
          This will be fetched realtime from Sennovate main website
        </p>
        <Button color="primary" as={Link} href={paths.service()}>
          See All
        </Button>
      </section>
    </div>
  );
}
