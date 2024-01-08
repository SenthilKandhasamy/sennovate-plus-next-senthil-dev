import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";

export default function PostRegistration() {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <h1 className="mb-4 text-xl">Thank you for Registering</h1>
      <form action={actions.login}>
        <input type="text" hidden name="redirectTo" value="/" readOnly />
        <FormButton size="lg" color="primary">
          Login
        </FormButton>
      </form>
    </div>
  );
}
