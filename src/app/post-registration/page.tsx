import * as actions from "@/actions";
import FormSubmitButton from "@/components/common/form-submit-button";
import { Divider } from "@nextui-org/react";

export default function PostRegistration() {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <div className="mb-4 text-center">
        <h1 className="text-xl mb-2">Thank you for Registering</h1>
        <h2>Check your inbox for Temporary Password</h2>
      </div>
      <Divider className="my-4" />
      <form action={actions.login}>
        <input type="text" hidden name="redirectTo" value="/" readOnly />
        <FormSubmitButton size="lg" color="primary">
          Login
        </FormSubmitButton>
      </form>
    </div>
  );
}
