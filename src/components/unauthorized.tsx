import { Divider } from "@nextui-org/react";

export default function Unauthorized() {
  return (
    <div className="mt-40">
      <div className="text-xl flex h-10 justify-center items-center space-x-4">
        <div>401</div>
        <Divider orientation="vertical" />
        <div>Unauthorized</div>
      </div>
    </div>
  );
}
