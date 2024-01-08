import { Skeleton } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="mt-20 space-y-2">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="h-10 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="w-2/3 space-y-2">
        <Skeleton className="rounded-lg">
          <div className="h-10 rounded-lg bg-default-300"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-10 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </div>
  );
}
