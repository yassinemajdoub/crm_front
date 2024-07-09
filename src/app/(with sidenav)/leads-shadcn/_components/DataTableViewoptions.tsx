"use client"

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "./NewyorkButton"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./NewYorkDropdownMenu"
import ColumnsSvg from "@/components/svg/columns"
import { ChevronDown } from "lucide-react"

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-[130px] bg-white h-[50px] rounded-lg px-[10px] justify-between flex items-center font-semibold text-[18px] text-black/80 dark:text-white/80  border-[#1D1DCE] border  py-0" >
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden lg:flex w-[150px] font-semibold text-[16px] text-black/80 dark:text-white/80 p-2" 
        >
          <ColumnsSvg className="w-[40px]" />
          Columns
          <ChevronDown className="stroke-[#1D1DCE] stroke-[2] mt-[2px] opacity-80 mr-[4px]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}