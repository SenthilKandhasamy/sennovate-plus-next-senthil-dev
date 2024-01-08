"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";

interface PriceTableProps {
  featureTitleLabel: string;
  plans: { label: string; key: string }[];
  featuresCollections: {
    name: string;
    description?: string;
    features: {
      name: string;
      description?: string;
      includesInPlan: string[];
    }[];
  }[];
}

export default function PriceTable({
  featureTitleLabel,
  plans,
  featuresCollections,
}: PriceTableProps) {
  const column = [
    {
      key: "title",
      label: featureTitleLabel,
    },
    ...plans.map((p) => ({
      ...p,
      label: <div className="text-center">{p.label}</div>,
    })),
  ];

  const rows = featuresCollections.reduce<any[]>((a, c) => {
    a.push({
      isCollection: true,
      key: c.name,
      title: <div className="text-primary-500 text-medium">{c.name}</div>,
      ...plans.reduce<any>((a, c) => {
        a[c.key] = "";
        return a;
      }, {}),
    });

    c.features.forEach((feature) => {
      a.push({
        key: feature.name,
        title: feature.name,
        ...plans.reduce<any>((a, c) => {
          const includesInPlanBy = feature.includesInPlan
            .map((p) => ({
              planKey: p.split(":")[0],
              value: p.split(":")[1],
            }))
            .find((p) => p.planKey === c.key);
          if (!includesInPlanBy) a[c.key] = "";
          else {
            const { planKey, value } = includesInPlanBy;
            a[c.key] = value ? (
              <div className="text-center px-2">{value}</div>
            ) : (
              <div className="text-center text-success-500 px-2">✓</div>
            );
          }
          return a;
        }, {}),
      });
    });

    return a;
  }, []);

  return (
    <Table aria-label="Sennovate plus Service Pricing Table">
      <TableHeader columns={column}>
        {(column) => (
          <TableColumn key={column.key} className="text-medium">
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.key} className="border-b-1 border-neutral-800">
            {(columnKey) => (
              <TableCell>{getKeyValue(row, columnKey)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
