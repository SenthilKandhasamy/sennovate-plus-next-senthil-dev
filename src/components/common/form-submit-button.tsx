"use client";

import { Button, ButtonProps } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

export default function FormSubmitButton(props: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button {...props} type="submit" isLoading={pending}>
      {props.children}
    </Button>
  );
}
