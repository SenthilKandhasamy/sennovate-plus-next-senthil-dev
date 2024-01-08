"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

export default function PriceTable() {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Levels of Service</TableColumn>
        <TableColumn>Essential</TableColumn>
        <TableColumn>Advanced</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-bold">Directory & MFA</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell>&nbsp;</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Tony Reichert</TableCell>
          <TableCell>&#x2713;</TableCell>
          <TableCell>&#x2713;</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Protect Authenticator App</TableCell>
          <TableCell>&#x2713;</TableCell>
          <TableCell>&#x2713;</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-bold">Web SSO</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell>&nbsp;</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Single Sign-On (SSO)</TableCell>
          <TableCell>&ndash;</TableCell>
          <TableCell>&#x2713;</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
