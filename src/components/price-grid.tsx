import { Card, CardBody, CardHeader } from "@nextui-org/react";

interface Price {
  name: string;
  plan: string;
  amount: string;
  suffix: string;
  description?: string;
}

export default function PriceGrid({ prices }: { prices: Price[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-10">
      {prices.map((price) => (
        <Card className="p-8" key={price.name}>
          <CardHeader className="justify-center">
            <h2 className="uppercase tracking-widest text-xl font-bold">
              {price.plan}
            </h2>
          </CardHeader>
          <CardBody>
            <div className="flex justify-center">
              <span
                data-suffix={price.suffix}
                className="
                    relative 
                    before:content-['$'] before:absolute before:top-[2px] before:-left-[10px]
                    after:content-[attr(data-suffix)] after:absolute after:bottom-[2px] after:-right-[100px]
                    "
              >
                <span className="text-7xl font-light text-primary-500">
                  {price.amount}
                </span>
              </span>
            </div>
            {price.description && (
              <div className="text-center mt-8 text-sm opacity-85">
                {price.description}
              </div>
            )}
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
