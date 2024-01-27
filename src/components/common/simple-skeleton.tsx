import { Skeleton } from "@nextui-org/react";

export default function SimpleSkeleton() {
  return (
    <div className="flex">
      <Skeleton className="mr-6 flex-grow rounded-lg">
        <div className="bg-default-300 h-24"></div>
      </Skeleton>
      <Skeleton className="flex-grow rounded-lg">
        <div className="bg-default-300 h-24"></div>
      </Skeleton>
    </div>
  );
}
