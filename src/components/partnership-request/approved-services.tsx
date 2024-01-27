"use client";

import { Button, Listbox, ListboxItem } from "@nextui-org/react";
import { useOptimistic, useState } from "react";

interface Props {}

function subtractSet(setA: Set<any>, setB: Set<any>) {
  const newSet = new Set<any>();
  setA.forEach((element) => {
    if (!setB.has(element)) {
      newSet.add(element);
    }
  });
  return newSet;
}

function addSets(setA: Set<any>, setB: Set<any>) {
  const newSet = new Set([...setB]);
  setA.forEach((element) => {
    newSet.add(element);
  });
  return newSet;
}

export default function ApprovedServices() {
  const [state, setState] = useState({
    availableServices: new Set<string>([]),
    selectedAvailableServices: new Set<string>([]),
    approvedServices: new Set<string>([]),
    selectedApprovedServices: new Set<string>([]),
  });

  const [optimisticState, setOptimisticState] = useOptimistic(
    state,
    (prevState, action) => {
      return prevState;
    }
  );

  const [selectedAvailableServices, setSelectedAvailableServices] = useState(
    new Set()
  );
  const [selectedApprovedServices, setSelectedApprovedServices] = useState(
    new Set()
  );

  const [availableServices, setAvailableServices] = useState(
    new Set(["etp", "soc", "edr"])
  );
  const [approvedServices, setApprovedServices] = useState(new Set(["iam"]));

  function handleApprove() {
    if (selectedAvailableServices.size === 0) return;
    setAvailableServices(
      subtractSet(availableServices, selectedAvailableServices)
    );
    setApprovedServices(addSets(approvedServices, selectedAvailableServices));
    setSelectedAvailableServices(new Set());
  }

  function handleRevert() {
    if (selectedApprovedServices.size === 0) return;
    setAvailableServices(addSets(availableServices, selectedApprovedServices));
    setApprovedServices(
      subtractSet(approvedServices, selectedApprovedServices)
    );
    setSelectedApprovedServices(new Set());
  }

  return (
    <div className="grid grid-cols-7 max-w-screen-md gap-5">
      <div className="col-span-3 flex flex-col justify-stretch">
        <h2 className="font-bold text-primary-500 mb-2">Available Services</h2>
        <div className="border-1 border-neutral-500 p-4 rounded-lg flex-1">
          <Listbox
            aria-label="Multiple selection example"
            selectionMode="multiple"
            selectedKeys={selectedAvailableServices as any}
            onSelectionChange={setSelectedAvailableServices as any}
          >
            {Array.from(availableServices).map((slug) => (
              <ListboxItem key={slug}>{slug}</ListboxItem>
            ))}
          </Listbox>
        </div>
      </div>
      <div className="col-span-1 flex flex-col justify-center">
        <Button className="mb-2" color="success" onClick={handleApprove}>
          Approve 👉
        </Button>
        <Button color="danger" onClick={handleRevert}>
          👈 Revert
        </Button>
      </div>

      <div className="col-span-3 flex flex-col justify-stretch">
        <h2 className="font-bold text-primary-500 mb-2">Approved Services</h2>
        <div className="border-1 border-neutral-500 p-4 rounded-lg flex-1">
          <Listbox
            aria-label="Multiple selection example"
            variant="bordered"
            selectionMode="multiple"
            selectedKeys={selectedApprovedServices as any}
            onSelectionChange={setSelectedApprovedServices as any}
          >
            {Array.from(approvedServices).map((slug) => (
              <ListboxItem key={slug}>{slug}</ListboxItem>
            ))}
          </Listbox>
        </div>
      </div>
    </div>
  );
}
