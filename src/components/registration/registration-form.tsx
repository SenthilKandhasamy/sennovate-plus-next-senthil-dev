"use client";

import { Card, CardBody, CardHeader, Input } from "@nextui-org/react";

import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";
import { useFormState } from "react-dom";

export const RegistrationForm = () => {
  const [formState, action] = useFormState(actions.registerUser, {
    errors: {},
  });

  return (
    <div className="container mt-20 max-w-[480px]">
      <Card>
        <CardHeader className="justify-center">
          <h1 className="text-xl text-center">Registration</h1>
        </CardHeader>
        <CardBody>
          <form action={action} className="space-y-4">
            <Input
              name="email"
              label="Company Email"
              required
              isInvalid={!!formState.errors.email}
              errorMessage={formState.errors.email?.join(", ")}
            />
            <Input
              name="companyName"
              label="Company Name"
              required
              isInvalid={!!formState.errors.companyName}
              errorMessage={formState.errors.companyName?.join(", ")}
            />
            <div className="grid lg:grid-cols-2 gap-4">
              <Input
                name="firstName"
                label="First Name"
                required
                isInvalid={!!formState.errors.firstName}
                errorMessage={formState.errors.firstName?.join(", ")}
              />
              <Input
                name="lastName"
                label="Last Name"
                required
                isInvalid={!!formState.errors.lastName}
                errorMessage={formState.errors.lastName?.join(", ")}
              />
            </div>
            <div className="grid lg:grid-cols-2 gap-4">
              <Input
                name="country"
                label="Country"
                isInvalid={!!formState.errors.country}
                errorMessage={formState.errors.country?.join(", ")}
              />
              <Input
                name="state"
                label="State"
                required
                isInvalid={!!formState.errors.state}
                errorMessage={formState.errors.state?.join(", ")}
              />
            </div>
            <Input
              name="contactNumber"
              label="Phone Number"
              required
              isInvalid={!!formState.errors.contactNumber}
              errorMessage={formState.errors.contactNumber?.join(", ")}
            />
            {!!formState.errors._form && (
              <div className="text-red-600 text-sm">
                {formState.errors._form}
              </div>
            )}
            <FormButton fullWidth color="primary">
              Register
            </FormButton>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
