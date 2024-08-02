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
import { Email } from "../utils/fetchemails";


export interface DataTableProps {
  columns: ColumnDef<Email>[];
  data: Email[] | null;
}


export const columns: ColumnDef<Email>[] = [
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
    accessorKey: "owner",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-indigo-100 text-center text-base text-black font-semibold leading-normal pl-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Owner
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="flex justify-center p-2 pr-4">
        {row.original.createdBy.email}
      </div>
    ),
  },
  {
    accessorKey: "subject",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-indigo-100 text-center text-base text-black font-semibold leading-normal pl-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          subject
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const subject = row.original.subject
      return(
        <div className="flex justify-center p-2 pr-9">
          {subject}
        </div>
      )
    },
  },
  {
    accessorKey: "isSent",
    header: "isSent",
    cell: ({ row }) => (
      <div className="flex justify-center p-2 pr-4">
        {row.original.isSent ? "Sent" : "Pending"}
      </div>
    ),
  },
  {
    accessorKey: "emailType",
    header: "emailType",
    cell: ({ row }) => (
      <div className="flex justify-center p-2 pr-4">
        {row.original.emailType}
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