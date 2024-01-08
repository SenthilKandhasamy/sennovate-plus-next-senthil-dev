import PriceTable from "@/components/price-table";
import data from "@/data/soc-mdr-service-plans.json";

export default function SocXDR() {
  return (
    <div className="my-20">
      <h1 className="text-center text-4xl mb-8 font-bold">
        MDR as a Service powered by EDR
      </h1>
      <PriceTable {...data} />
    </div>
  );
}
