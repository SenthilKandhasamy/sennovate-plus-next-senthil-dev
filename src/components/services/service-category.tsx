import { Divider } from "@nextui-org/react";
import { ReactNode } from "react";

interface ServiceCategoryProps {
  name: string;
  children: ReactNode;
}

export default function ServiceCategory({
  name,
  children,
}: ServiceCategoryProps) {
  return (
    <div>
      <h3 className="text-xl">{name}</h3>
      <Divider className="my-6" />
      <div className="grid grid-cols-3 gap-5">{children}</div>
    </div>
  );
}
