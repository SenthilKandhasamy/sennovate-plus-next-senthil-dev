"use client";

import {
  BreadcrumbItem,
  Breadcrumbs as NextUiBreadcrumbs,
} from "@nextui-org/react";
import Link from "next/link";

export default function BreadCrumbs(props: {
  items: {
    label: string;
    href?: string;
  }[];
}) {
  return (
    <NextUiBreadcrumbs>
      {props.items.map((item) => (
        <BreadcrumbItem key={item.label}>
          {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
        </BreadcrumbItem>
      ))}
    </NextUiBreadcrumbs>
  );
}
