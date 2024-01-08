import PriceTable from "@/components/price-table";
import data from "@/data/os-admin-service-plans.json";

export default function SocXDR() {
  return (
    <div className="my-20">
      <h1 className="text-center text-4xl mb-8 font-bold">
        OS Administration as a Service
      </h1>
      <PriceTable {...data} />
    </div>
  );
}
