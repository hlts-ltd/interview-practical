"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/compositions/Table";

import { Song } from "@/database";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Button } from "@/components/ui/elements/Button/Button";
import { Input } from "@/components/ui/elements/Input";
import { Modal } from "../Modal";
import { AddSongForm } from "../AddSongForm";
import Rating from "../Rating/Rating";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks";
import {} from "next/navigation";

type FavoriteSongsTableProps = {
  id: string;
  data: Song[];
  addSongHandler: Function;
  updateSongHandler: Function;
  deleteSongHandler: Function;
  downloadHandler: Function;
};

export const FavoriteSongsTable: React.FC<FavoriteSongsTableProps> = ({
  id,
  data,
  addSongHandler,
  updateSongHandler,
  deleteSongHandler,
  downloadHandler,
}) => {
  const router = useRouter();
  const session = useUser();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const columns: ColumnDef<Song>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "artist",
      header: "Artist",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("artist")}</div>
      ),
    },
    {
      accessorKey: "genre",
      header: "Genre",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("genre")}</div>
      ),
    },
    {
      accessorKey: "rating",
      header: ({ column }) => {
        return (
          <Button
            className=""
            label="Rating"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            mode="table"
            innerClassName="bg-transparent text-muted-foreground "
          />
        );
      },
      cell: ({ row }) => <Rating score={row.getValue("rating")} />,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const [isUpdateModalOpen, setIsUpdateModalOpen] = React.useState(false);
        const rowData = row.original;

        return (
          <>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsUpdateModalOpen(true)}
                className="text-blue-500 hover:underline"
              >
                Update
              </button>
              <button
                onClick={() => downloadHandler(rowData.id)}
                className="text-green-500 hover:underline"
              >
                Download
              </button>
              <button
                onClick={() => {
                  deleteSongHandler(rowData.id);
                  router.refresh();
                }}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>

            {isUpdateModalOpen && (
              <Modal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
              >
                <AddSongForm
                  formSuccessMsg="Song updated successfully!"
                  formErrorMsg="Failed to update the song."
                  updateSongHandler={updateSongHandler}
                  defaultValues={{
                    id: rowData.id,
                    title: rowData.title,
                    artist: rowData.artist,
                    genre: rowData.genre,
                    rating: rowData.rating,
                  }}
                />
              </Modal>
            )}
          </>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center ">
        <Input
          placeholder="Filter title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="w-[50%] mt-0 mb-2"
        />
        {session?.id === id && (
          <Button
            type="submit"
            label="Add Song"
            mode="add"
            onClick={handleOpenModal}
          />
        )}
      </div>
      <div className="mt-2 rounded-lg overflow-hidden border border-border">
        <Table className="border">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="bg-secondary">
                    <div>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer hover:bg-border/25 dark:hover:bg-ring/40"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            type="button"
            mode="previous"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            label="Previous"
          />
          <Button
            type="button"
            label="Next"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          />
        </div>
      </div>

      <div className="py-6"></div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <AddSongForm
          addSongHandler={addSongHandler}
          formErrorMsg="Something went wrong"
          formSuccessMsg="Favorite song successfully added"
        />
      </Modal>
    </div>
  );
};
