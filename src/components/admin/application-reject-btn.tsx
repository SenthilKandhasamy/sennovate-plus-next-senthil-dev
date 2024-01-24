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

export default function ApplicationRejectBtn({ user }: { user: User }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  return (
    <>
      <Button color="danger" onPress={onOpen}>
        Reject
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Reject Application
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to Reject this application</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <ModalAsyncButton
                  serverAction={actions.rejectApplication.bind(null, user.id)}
                  onSuccess={() => {
                    toast("Application Rejected", {
                      type: "success",
                    });
                    router.refresh();
                  }}
                  color="danger"
                >
                  Reject
                </ModalAsyncButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
