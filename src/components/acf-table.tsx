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

type WordpressACFTable = {
  use_header: boolean;
  header: {
    c: string;
  }[];
  caption: boolean;
  body: {
    c: string;
  }[][];
};

export default function ACFTable({ table }: { table: WordpressACFTable }) {
  const columns = table.header.map((h, i) => ({
    key: i,
    label: h.c,
  }));

  const rows = table.body.map((tableRow, i) => {
    const row: Record<any, any> = {
      key: i,
    };

    tableRow.forEach((c, i) => {
      row[i] = c.c;
    });

    return row;
  });

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
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
  );
}
