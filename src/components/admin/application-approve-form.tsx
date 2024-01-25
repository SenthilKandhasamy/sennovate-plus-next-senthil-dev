import { Select, SelectItem } from "@nextui-org/react";

export default function ApplicationApproveForm() {
  // const services = await sennovateMain.getService();
  // console.log(services);

  return (
    <div>
      <Select>
        <SelectItem key="hello">Hello</SelectItem>
        <SelectItem key="hi">Hi</SelectItem>
      </Select>
    </div>
  );
}
