"use client";

import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableProps,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

interface Props {
  columns: {
    key: string;
    label: string;
  }[];
  rows: {
    key: string;
    [key: string]: any;
  }[];
  total: number;
  perPage: number;
  tableProps?: TableProps;
}

export default function PartnershipRequestTable({
  columns,
  rows,
  perPage,
  total,
  tableProps,
}: Props) {
  const totalPage = useMemo(() => {
    return Math.ceil(total / perPage);
  }, [total, perPage]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  let currentPage = searchParams.get("page") || 1;

  return (
    <Table
      aria-label="Paginated Partnership Request Table"
      selectionMode="single"
      onRowAction={(rowId) => {
        router.push(`${pathName}/${rowId}`);
      }}
      bottomContent={
        totalPage > 1 ? (
          <div className="flex w-full justify-center">
            <Pagination
              total={totalPage}
              initialPage={+currentPage}
              onChange={(page) => {
                router.push(`${pathName}?page=${page}`);
              }}
            />
          </div>
        ) : null
      }
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows} emptyContent="No Request yet">
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
