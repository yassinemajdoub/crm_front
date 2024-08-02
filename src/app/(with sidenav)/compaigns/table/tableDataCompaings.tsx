"use client"

import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  Header,
  Table as TanstackTable,
  VisibilityState,
  getFilteredRowModel,
  RowSelectionState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { useEffect, useState } from "react"
import { DataTablePagination } from "./pagination"
import { DataTableToolbar } from "./DataTableToolBar"

import TrashListView from "@/components/svg/TrashListView"
import { Campaign } from "../utils/fetchCompaigns"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<Campaign>[];
  data: Campaign[] | null;
}

import {create} from 'zustand';

interface ColumnOrderState {
  columnOrder: string[];
  setColumnOrder: (order: string[]) => void;
}

export const useColumnOrderStore = create<ColumnOrderState>((set) => ({
  columnOrder: [],
  setColumnOrder: (order) => set({ columnOrder: order }),
}));


export function TableDataCompaings<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  // const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])
  // const resetOrder = () =>
  //   setColumnOrder(columns.map(column => column.id as string))
  const { columnOrder, setColumnOrder } = useColumnOrderStore();
  
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),    
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnOrderChange: setColumnOrder,  
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      columnOrder,
      rowSelection,
    },
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    columnResizeMode: 'onChange',
    
  })
  const selectedRows = table.getSelectedRowModel().flatRows;
  const originalDataList = selectedRows.map(row => row.original);
  
  console.log(originalDataList);
  console.log(originalDataList.length)
  
  const handleTrashClicks = () => {
    const selectedIds = originalDataList.map(data => data.id);
    console.log(`${originalDataList.length} deleted`);
    console.log('Deleted IDs:', selectedIds);
  };


  
  return (
    <>
      <DataTableToolbar table={table} />  

      {originalDataList.length > 0 && (
        <div className="flex justify-end items-center w-[1300px] py-4 px-5">
          <button>
          <TrashListView                                     
                className=""
                onClick={handleTrashClicks} />
            </button>
        </div>
      )}
      
    <div className="rounded-md border">
      <Table>
      <TableHeader className="leading-normal pl-2 bg-indigo-50 hover:bg-indigo-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-indigo-50">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-center text-base text-black font-semibold leading-normal pl-2">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    <DataTablePagination table={table} />
    {/* <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div> */}
    </>
  )
}
