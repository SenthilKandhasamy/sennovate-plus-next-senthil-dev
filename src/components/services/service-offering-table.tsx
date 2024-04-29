"use client";
import { ServiceOffering} from "@/sennovate-main-api/service.type";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
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
if (offering.has_points_b) {
    const rows = offering.points_b?.map((point: any) => renderPoint2(point)) || [];
    const columns = [
      { offering: point.title},
      { key: "onprem_essential", label: "On-Prem Essential" },
      { key: "onprem_advance", label: "On-Prem Advance" },
      { key: "cloud_essential", label: "Cloud Essential" },
      { key: "cloud_advance", label: "Cloud Advance" },
    ];

    return (
      <Table>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} className="text-medium">
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              <TableCell>{item.offering}</TableCell>
              <TableCell>{item.onprem_essential}</TableCell>
              <TableCell>{item.onprem_advance}</TableCell>
              <TableCell>{item.cloud_essential}</TableCell>
              <TableCell>{item.cloud_advance}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  } else if (offering.has_points) {
    const rows = offering.points?.map((point: any) => renderPoint(point)) || [];
    const columns = [
      { offering: point.title},
      { key: "essential", label: "Essential" },
      { key: "advance", label: "Advance" },
    ];

    return (
      <Table>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} className="text-medium">
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              <TableCell>{item.offering}</TableCell>
              <TableCell>{item.essential}</TableCell>
              <TableCell>{item.advance}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  } else {
    return null; // Return null if neither has_points nor has_points_b is true
  }
}
