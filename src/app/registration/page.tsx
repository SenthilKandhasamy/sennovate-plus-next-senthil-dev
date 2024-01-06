import { RegistrationForm } from "@/components/registration/registration-form";

export default function RegistrationPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-3xl mb-2">Sennovate Plus</div>
      <h1 className="text-2xl">Registration</h1>
      <div className="shadow p-8 mt-6 min-w-[30rem] rounded-lg">
        <RegistrationForm />
      </div>
    </div>
  );
}
