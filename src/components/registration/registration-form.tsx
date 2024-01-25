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
import { User } from "@prisma/client";
import { useFormState } from "react-dom";

const getAttrName = (key: keyof User) => key;

export const RegistrationForm = () => {
  const [formState, action] = useFormState(actions.registerUser, {
    errors: {},
  });

  function renderInput(name: keyof User, label: string, required?: boolean) {
    return (
      <Input
        isRequired={required}
        name={name}
        label={label}
        isInvalid={!!(formState.errors as any)[name]}
        errorMessage={(formState.errors as any)[name]?.join(", ")}
      />
    );
  }

  return (
    <div className="container mt-20 max-w-[480px]">
      <Card>
        <CardHeader className="justify-center">
          <h1 className="text-xl text-center">Partner Registration</h1>
        </CardHeader>
        <CardBody>
          <form action={action} className="space-y-4">
            <h2>Company Related Information</h2>
            {renderInput("companyName", "Company Name", true)}
            {renderInput("companyEmail", "Company Email", true)}
            {renderInput("jobTitle", "Job Title", true)}
            {renderInput("country", "Country")}
            {renderInput("state", "State")}
            <Divider className="my-4" />
            <h2>Personal Information</h2>
            {renderInput("firstName", "First Name", true)}
            {renderInput("lastName", "Last Name", true)}
            {renderInput("phone", "contact Number")}
            <Divider className="my-4" />
            <h2>Partnership</h2>
            <Select
              isRequired
              label="Select Partnership Type"
              isInvalid={!!formState.errors.partnershipType}
              errorMessage={formState.errors.partnershipType}
              name={getAttrName("partnershipType")}
            >
              <SelectItem key="Referral" value="Referral">
                Referral
              </SelectItem>
              <SelectItem key="Reseller" value="Reseller">
                Reseller
              </SelectItem>
            </Select>
            <Textarea
              name={getAttrName("remark")}
              label="Remarks"
              isInvalid={!!formState.errors.remark}
              errorMessage={formState.errors.remark}
            />
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
