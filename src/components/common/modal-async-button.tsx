"use client";

import { Button, ButtonProps, useModalContext } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ModalAsyncButton(
  props: ButtonProps & { serverAction: any; onSuccess?: any }
) {
  const { onClose } = useModalContext();
  const [loading, setLoading] = useState(false);

  return (
    <Button
      {...props}
      isLoading={loading}
      onPress={async () => {
        setLoading(true);
        const error = await props.serverAction();
        if (error?._form) {
          let msg = "Something went wrong";
          if (Array.isArray(error?._form)) {
            msg = error?._form.join(", ");
          }
          toast(msg, {
            type: "error",
          });
        } else {
          if (props.onSuccess) {
            props.onSuccess();
          }
        }
        setLoading(false);
        onClose();
      }}
    >
      {props.children}
    </Button>
  );
}
