import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";
import { Button, Divider } from "@nextui-org/react";
import Link from "next/link";

export default function AuthChoice() {
  return (
    <div className="flex flex-col justify-center items-center mt-40">
      <div>
        <h1 className="text-2xl">Login to access the application</h1>
        <Divider className="my-4" />
        <div className="flex">
          <form action={actions.login} className="mr-2 w-1/2">
            <input type="text" hidden name="redirectTo" value="/" readOnly />
            <FormButton
              type="submit"
              fullWidth
              variant="bordered"
              color="primary"
            >
              Login
            </FormButton>
          </form>
          <Button
            as={Link}
            href="/registration"
            className="w-1/2"
            color="primary"
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
