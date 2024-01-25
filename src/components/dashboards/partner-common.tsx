import { Button, Divider } from "@nextui-org/react";
import Link from "next/link";

export default function PartnerCommon(props: { type: string }) {
  return (
    <div>
      <h1 className="text-3xl">
        Welcome to Sennovate{" "}
        <span className="opacity-60 text-6xl text-primary-500">
          {props.type}
        </span>{" "}
        Program
      </h1>
      <Divider className="mt-4 mb-24" />

      <Button as={Link} href="/approved-services">
        See all Approved Services
      </Button>
    </div>
  );
}
