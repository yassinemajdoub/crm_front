"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Lead, useLeadsStore } from "@/stores/leadsStore"
import { useEffect } from "react";
import { ArrowUpDown,MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Campaign } from "../utils/fetchCompaigns";


export interface DataTableProps {
  columns: ColumnDef<Campaign>[];
  data: Campaign[] | null;
}


export const columns: ColumnDef<Campaign>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ? true :
          table.getIsSomePageRowsSelected() ? "indeterminate" :
          false
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
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-indigo-100 text-center text-base text-black font-semibold leading-normal pl-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="flex justify-center p-2 pr-4">
        {row.original.id}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-indigo-100 text-center text-base text-black font-semibold leading-normal pl-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="flex justify-center p-2 pr-4">
        {row.original.name}
      </div>
    ),
  },
  {
    accessorKey: "emailsCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-indigo-100 text-center text-base text-black font-semibold leading-normal pl-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          emailsCount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const count = row.original.emailsCount
      return(
        <div className="flex justify-center p-2 pr-9">
          {count}
        </div>
      )
    },
  },
  {
    accessorKey: "isActive",
    header: "isActive",
    cell: ({ row }) => (
      <div className="flex justify-center p-2 pr-4">
        {row.original.isActive ? "Active" : "Inactive"}
      </div>
    ),
  },
  {
    accessorKey: "startDate",
    header: "startDate",
    cell: ({ row }) => (
      <div className="flex justify-center p-2 pr-4">
        {row.original.startDate}
      </div>
    ),
  },
  {
    accessorKey: "endDate",
    header: "endDate",
    cell: ({ row }) => (
      <div className="flex justify-center p-2 pr-4">
        {row.original.endDate}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const lead = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(lead.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];