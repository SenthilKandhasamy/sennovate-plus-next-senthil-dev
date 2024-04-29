"use client";
import { ServiceOffering } from "@/sennovate-main-api/service.type";
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

function renderPoint2(point: any) {
  return {
    key: point.title,
    offering: point.title,
    onprem_essential: <div className="text-center px-2">{point.onprem_essential}</div>,
    onprem_advance: <div className="text-center px-2">{point.onprem_advance}</div>,
    cloud_essential: <div className="text-center px-2">{point.cloud_essential}</div>,
    cloud_advance: <div className="text-center px-2">{point.cloud_advance}</div>,
  };
}

export default function ServiceOfferingTable({ offering }: Props) {
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
    {
      key: "onprem_essential",
      label: <div className="text-center">On-prem Essential</div>,
      width: "200px",
    },
    {
      key: "onprem_advance",
      label: <div className="text-center">On-prem Advance</div>,
      width: "200px",
    },
    {
      key: "cloud_essential",
      label: <div className="text-center">Cloud Essential</div>,
      width: "200px",
    },
    {
      key: "cloud_advance",
      label: <div className="text-center">Cloud Advance</div>,
      width: "200px",
    },
  ];

  let points;
  if (c.has_points) {
    points = offering.points;
  } else if (c.has_points_b) {
    points = offering.points_b;
  } else {
    points = [];
  }

  const rows = points.reduce<any[]>((a, c) => {
    if (c.has_points_b) {
      a.push(renderPoint2(c));
    } else {
      a.push(renderPoint(c));
    }
    return a;
  }, []);

  (offering.children || []).reduce((a, c) => {
    a.push({
      key: c.heading,
      offering: <span className="text-primary-500">{c.heading}</span>,
    });
    if (c.has_points || c.has_points_b) {
      const childPoints = c.has_points ? c.points : c.points_b;
      childPoints?.forEach((p) => {
        if (c.has_points_b) {
          a.push(renderPoint2(p));
        } else {
          a.push(renderPoint(p));
        }
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
