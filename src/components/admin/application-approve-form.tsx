import * as actions from "@/actions";
import * as sennovateMain from "@/sennovate-main-api";
import FormSubmitButton from "../common/form-submit-button";
import ServiceSelect from "./service-select";

export default async function ApplicationApproveForm({
  userId,
}: {
  userId: string;
}) {
  const services = await sennovateMain.getService();

  return (
    <form className="space-y-4" action={actions.approveApplication}>
      <ServiceSelect
        name="approvedServices"
        label="Select Services to Approve"
        selectionMode="multiple"
        services={services}
      />
      {/* <Input name="priceFactor" label="Price Factor" type="number" step="0.1" /> */}
      <input type="text" hidden name="userId" value={userId} />
      <FormSubmitButton fullWidth color="success">
        Approve Application
      </FormSubmitButton>
    </form>
  );
}
