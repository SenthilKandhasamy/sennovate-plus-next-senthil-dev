"use client";

import * as actions from "@/actions";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ModalAsyncButton from "../common/modal-async-button";

export default function ApplicationApproveBtn({ user }: { user: User }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  return (
    <>
      <Button color="success" onPress={onOpen}>
        Approve
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Approve Application
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to Approve this application</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <ModalAsyncButton
                  color="success"
                  serverAction={actions.approveApplication.bind(null, user.id)}
                  onSuccess={() => {
                    toast("Approved", {
                      type: "success",
                    });
                    router.refresh();
                  }}
                >
                  Approve
                </ModalAsyncButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
