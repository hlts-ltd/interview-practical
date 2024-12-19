"use client";

import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";

import { DataTableColumnHeader } from "@/app/(authenticated)/users/data-table-column-header";
import { DataTableRowActions } from "@/app/(authenticated)/users/data-table-row-actions";
import { usersStatus } from "@/app/(authenticated)/users/definitions";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"User"} />,
    cell: ({ row }) => {
      for (const r in row) {
        return <div className="font-medium">{row['original']['name']}</div>; 
      }
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Phone"} />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Email"} />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Status"} />,
    cell: ({ row }) => {
      const status = usersStatus.find((status) => status.value === row.getValue("status"));

      if (!status) {
        return null;
      }

      return (
        <div
          className={clsx("flex w-[100px] items-center", {
            "text-red-500": status.value === "inactive",
            "text-green-500": status.value === "active",
          })}>
          {status.icon && <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      for (const r in row) {
        return <DataTableRowActions row={row['original']['id']} />
      }
    },
  },
];