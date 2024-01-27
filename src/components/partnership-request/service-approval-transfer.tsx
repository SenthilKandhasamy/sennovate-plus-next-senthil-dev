"use client";

import { Button, Listbox, ListboxItem } from "@nextui-org/react";
import { useState } from "react";

interface Service {
  key: string;
  label: string;
}

interface Props {
  availableServices: Service[];
  approvedServices: Service[];
  approve: (services: Service[]) => Promise<void | { error: string[] }>;
  revert: (services: Service[]) => Promise<void | { error: string[] }>;
}

export default function ServiceApprovalTransfer({
  availableServices,
  approvedServices,
  approve,
  revert,
}: Props) {
  const [approving, setApproving] = useState(false);
  const [reverting, setReverting] = useState(false);
  const [selectedAvailableServices, setSelectedAvailableServices] = useState(
    new Set<Service>()
  );
  const [selectedApprovedServices, setSelectedApprovedServices] = useState(
    new Set<Service>()
  );

  const [state, setState] = useState({
    availableServices: new Set(availableServices),
    approvedServices: new Set(approvedServices),
  });

  function handleApprove() {
    setApproving(true);
    approve(Array.from(selectedAvailableServices))
      .then()
      .finally(() => {
        setApproving(false);
      });
  }

  function handleRevert() {
    setReverting(true);
    approve(Array.from(selectedApprovedServices))
      .then()
      .finally(() => {
        setReverting(false);
      });
  }

  return (
    <div className="grid grid-cols-10 gap-5">
      <div className="col-span-4 flex flex-col justify-stretch">
        <h2 className="font-bold text-primary-500 mb-2">Available Services</h2>
        <div className="border-1 border-neutral-500 p-4 rounded-lg flex-1 min-h-[482px]">
          <Listbox
            aria-label="Multiple selection example"
            selectionMode="multiple"
            selectedKeys={selectedAvailableServices as any}
            onSelectionChange={setSelectedAvailableServices as any}
          >
            {Array.from(state.availableServices).map((s) => (
              <ListboxItem key={s.key}>{s.label}</ListboxItem>
            ))}
          </Listbox>
        </div>
      </div>
      <div className="col-span-2 flex flex-col justify-center">
        <Button
          className="mb-2"
          color="success"
          onClick={handleApprove}
          isLoading={approving}
        >
          Approve 👉
        </Button>
        <Button color="danger" onClick={handleRevert} isLoading={reverting}>
          👈 Revert
        </Button>
      </div>

      <div className="col-span-4 flex flex-col justify-stretch">
        <h2 className="font-bold text-primary-500 mb-2">Approved Services</h2>
        <div className="border-1 border-neutral-500 p-4 rounded-lg flex-1 min-h-[482px]">
          <Listbox
            aria-label="Multiple selection example"
            variant="bordered"
            selectionMode="multiple"
            selectedKeys={selectedApprovedServices as any}
            onSelectionChange={setSelectedApprovedServices as any}
          >
            {Array.from(state.approvedServices).map((s) => (
              <ListboxItem key={s.key}>{s.label}</ListboxItem>
            ))}
          </Listbox>
        </div>
      </div>
    </div>
  );
}
