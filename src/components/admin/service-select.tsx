"use client";

import { Select, SelectItem, SelectProps } from "@nextui-org/react";
export default function ServiceSelect(
  props: Omit<SelectProps, "children"> & {
    services: {
      title: string;
      slug: string;
    }[];
  }
) {
  return (
    <Select {...props}>
      {props.services.map((service) => (
        <SelectItem key={service.slug} value={service.title}>
          {service.title}
        </SelectItem>
      ))}
    </Select>
  );
}
