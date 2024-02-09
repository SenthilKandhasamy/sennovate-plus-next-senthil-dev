import * as actions from "@/actions";
import FormSubmitButton from "@/components/common/form-submit-button";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function AuthChoice() {
  return (
    <div className="flex flex-col justify-center items-center mt-40">
      <div>
        <div className="space-y-2 w-60">
          <Button
            as={Link}
            href="/partner-registration"
            color="primary"
            fullWidth
            className="mb-10"
          >
            Partnership Request
          </Button>
          <form action={actions.login}>
            <FormSubmitButton
              type="submit"
              fullWidth
              variant="bordered"
              color="primary"
            >
              Partner Login
            </FormSubmitButton>
          </form>
          <form action={actions.loginWithSennovate}>
            <FormSubmitButton fullWidth variant="bordered">
              Employee Login
            </FormSubmitButton>
          </form>
        </div>
      </div>
    </div>
  );
}
