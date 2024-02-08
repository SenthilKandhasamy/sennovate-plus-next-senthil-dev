"use client";

import {
  BreadcrumbItem,
  Breadcrumbs as NextUiBreadcrumbs,
} from "@nextui-org/react";

export default function BreadCrumbs(props: {
  items: {
    label: string;
    href?: string;
  }[];
}) {
  return (
    <NextUiBreadcrumbs>
      {props.items.map((item) => (
        <BreadcrumbItem key={item.label} href={item.href}>
          {item.label}
        </BreadcrumbItem>
      ))}
    </NextUiBreadcrumbs>
  );
}
