import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";
import { Button, Divider } from "@nextui-org/react";

export default function AuthChoice() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div>
        <h1>Login to access the application</h1>
        <Divider className="my-4" />
        <div className="flex">
          <form action={actions.login} className="mr-2">
            <input type="text" hidden name="redirectTo" value="/" readOnly />
            <FormButton type="submit">Login</FormButton>
          </form>
          <Button as="a" href="/registration" fullWidth>
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
