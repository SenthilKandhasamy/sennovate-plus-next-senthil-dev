"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Textarea,
} from "@nextui-org/react";

import {
  createPartnershipRequest,
  FormType,
} from "@/actions/create-partnership-request";
import FormSubmitButton from "@/components/common/form-submit-button";
import { Country } from "country-state-city";
import { useFormState } from "react-dom";

const attrName = (key: keyof FormType) => key;
const countries = Country.getAllCountries().map((c) => ({
  isoCode: c.isoCode,
  label: c.name,
  value: c.name,
  flag: c.flag,
}));

export const PartnershipRequestForm = () => {
  const [formState, action] = useFormState(createPartnershipRequest, {
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
            <h2>Please fill in your company information below</h2>
            <Input
              name="companyName"
              label="Company Name"
              isRequired
              isInvalid={!!formState.errors.companyName}
              errorMessage={formState.errors.companyName}
            />
            <Autocomplete
              name="companyCountry"
              isInvalid={!!formState.errors.companyCountry}
              errorMessage={formState.errors.companyCountry}
              defaultItems={countries}
              label="Select Country"
              isRequired
            >
              {(country) => (
                <AutocompleteItem
                  key={country.value}
                  startContent={<span>{country.flag}</span>}
                >
                  {country.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
            <Input
              name="companyState"
              label="State"
              isInvalid={!!formState.errors.companyState}
              errorMessage={formState.errors.companyState}
            />
            <Divider className="my-4" />
            <h2>Personal Information</h2>
            <Input
              name="employeeName"
              label="Name"
              isRequired
              isInvalid={!!formState.errors.employeeName}
              errorMessage={formState.errors.employeeName}
            />
            <Input
              name="employeeJobTitle"
              label="Job Title"
              isRequired
              isInvalid={!!formState.errors.employeeJobTitle}
              errorMessage={formState.errors.employeeJobTitle}
            />
            <Input
              name="employeeEmail"
              label="Company Email"
              isRequired
              type="email"
              isInvalid={!!formState.errors.employeeEmail}
              errorMessage={formState.errors.employeeEmail}
            />
            <Input
              name="employeePhone"
              label="Contact Number"
              isRequired
              isInvalid={!!formState.errors.employeePhone}
              errorMessage={formState.errors.employeePhone}
            />
            <Textarea
              name={attrName("remark")}
              label="Additional Info/Remarks"
              isInvalid={!!formState.errors.remark}
              errorMessage={formState.errors.remark}
            />
            {!!formState.errors._form && (
              <div className="text-red-600 text-sm">
                {formState.errors._form}
              </div>
            )}
            <FormSubmitButton fullWidth color="primary">
              Submit
            </FormSubmitButton>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
