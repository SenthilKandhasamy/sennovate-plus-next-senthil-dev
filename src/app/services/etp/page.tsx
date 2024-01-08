import PriceTable from "@/components/price-table";
import data from "@/data/etp-as-service-plans.json";

export default function IamService() {
  return (
    <div className="my-20">
      <h1 className="text-center text-4xl mb-8 font-bold">ETP as a Service</h1>
      <PriceTable {...data} />
    </div>
  );
}
