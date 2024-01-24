"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";

import * as actions from "@/actions";
import FormSubmitButton from "@/components/common/form-submit-button";
import { useFormState } from "react-dom";

export const RegistrationForm = () => {
  const [formState, action] = useFormState(actions.registerUser, {
    errors: {},
  });

  return (
    <div className="container mt-20 max-w-[480px]">
      <Card>
        <CardHeader className="justify-center">
          <h1 className="text-xl text-center">Partner Registration</h1>
        </CardHeader>
        <CardBody>
          <form action={action} className="space-y-4">
            <h2>Company Related Information</h2>
            <Input
              name="companyName"
              label="Company Name"
              required
              isInvalid={!!formState.errors.companyName}
              errorMessage={formState.errors.companyName?.join(", ")}
            />
            <Input
              name="email"
              label="Company Email"
              required
              isInvalid={!!formState.errors.email}
              errorMessage={formState.errors.email?.join(", ")}
            />
            <Input name="jobTitle" label="Job Title" required />
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

            <Divider className="my-4" />
            <h2>Personal Information</h2>
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
            <Input
              name="contactNumber"
              label="Phone Number"
              required
              isInvalid={!!formState.errors.contactNumber}
              errorMessage={formState.errors.contactNumber?.join(", ")}
            />

            <Divider className="my-4" />
            <h2>Partnership</h2>
            <Select label="Select Partnership Type">
              <SelectItem key="referral" value="referral">
                Referral
              </SelectItem>
              <SelectItem key="reseller" value="reseller">
                Reseller
              </SelectItem>
              <SelectItem key="directSales" value="directSales">
                Direct Sales
              </SelectItem>
            </Select>
            <Textarea label="Remarks" />

            {!!formState.errors._form && (
              <div className="text-red-600 text-sm">
                {formState.errors._form}
              </div>
            )}
            <FormSubmitButton fullWidth color="primary">
              Register
            </FormSubmitButton>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
