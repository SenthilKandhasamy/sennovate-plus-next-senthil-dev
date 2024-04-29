"use client";

import { ServiceOffering1, ServiceOffering2 } from "@/sennovate-main-api/service.type";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";

interface Props {
  offering: ServiceOffering;
}

function renderPoint(point: any) {
  return {
    key: point.title,
    offering: point.title,
    essential: <div className="text-center px-2">{point.essential}</div>,
    advance: <div className="text-center px-2">{point.advance}</div>,
  };
}

export default function ServiceOffering1({ offering }: Props) {
  const columns = [
    {
      key: "offering",
      label: offering.heading,
    },
    {
      key: "essential",
      label: <div className="text-center">Essential</div>,
      width: "200px",
    },
    {
      key: "advance",
      label: <div className="text-center">Advance</div>,
      width: "200px",
    },
  ];

  const rows = (offering.points || []).reduce<any[]>((a, c) => {
    a.push(renderPoint(c));
    return a;
  }, []);

  (offering.children || []).reduce((a, c) => {
    a.push({
      key: c.heading,
      offering: <span className="text-primary-500">{c.heading}</span>,
    });
    if (c.has_points) {
      c.points?.forEach((p) => {
        a.push(renderPoint(p));
      });
    }
    return a;
  }, rows);

  return (
    <div>
      <Table>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              width={column.width as any}
              className="text-medium"
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
