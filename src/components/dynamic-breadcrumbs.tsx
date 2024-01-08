"use client";

import {
  BreadcrumbItem,
  Breadcrumbs as NextUiBreadcrumbs,
} from "@nextui-org/react";

import { usePathname } from "next/navigation";
export default function DynamicBreadcrumbs() {
  const path = usePathname();

  let parent = "";
  const links = path
    .split("/")
    .filter(Boolean)
    .map((slug) => {
      const href = parent + "/" + slug;
      parent = href;
      return {
        slug,
        href,
      };
    });

  return (
    <NextUiBreadcrumbs>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      {links.map((link) => (
        <BreadcrumbItem key={link.slug} href={link.href}>
          {link.slug}
        </BreadcrumbItem>
      ))}
    </NextUiBreadcrumbs>
  );
}
