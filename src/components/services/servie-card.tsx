import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import Link from "next/link";

interface ServiceProps {
  name: string;
  description: string;
  pricingPage: string;
}

export default function ServiceCard({
  name,
  description,
  pricingPage,
}: ServiceProps) {
  return (
    <Card>
      <CardHeader>
        <h1 className="font-bold text-lg">{name}</h1>
      </CardHeader>
      <CardBody>
        <p className="text-sm opacity-80">{description}</p>
      </CardBody>
      <CardFooter>
        <Button as={Link} fullWidth color="primary" href={pricingPage}>
          Details
        </Button>
      </CardFooter>
    </Card>
  );
}
