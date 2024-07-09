"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "./NewyorkButton"
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from "./NewyorkInput"
import { DataTableViewOptions } from "./DataTableViewoptions"

import { DataTableFacetedFilter } from "./DataTAbleFacetedFilter"
// import { useLeadsStore } from "@/sotres/leadsStore"

import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"
import Addleads from "../../leads/_components/AddLeads"
import SelectViewMode from "../../deals/_components/SelectViewMode"
import FilterBy from "../../deals/_components/FilterBy"
import { Plus, Search } from "lucide-react"


interface DataTableToolbarProps<TData> {
  table: Table<TData>
  params: {
    id:string
  } 
}

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
]

export function DataTableToolbar<TData>({
  table,
  params
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  
  return (
    <>
    <div className="flex items-center justify-between p-3">
      <h1 className="text-[40px] text-[#202020]/90 font-semibold">
        Leads
        </h1>
        
      <div className="flex flex-2 items-center space-x-2">
          <Input
          placeholder="Search..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="w-full lg:w-[450px] border border-[#1D1DCE]  focus-visible:border-none focus-visible:ring-[#1D1DCE]/40 font-medium pl-[40px] h-[50px]"
          />
        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      <FilterBy/>
      <SelectViewMode/>
      <DataTableViewOptions table={table} />
      <Button className="justify-center text-white px-2 h-[50px] rounded-lg flex items-center font-semibold text-[18px] dark:text-white/80  hover:bg-blue-800 bg-[#1D1DCE] border  py-0">
            <Plus className="p-[1px] stroke-[2] mr-[8px]" />
            <span className="text-white text-sm font-semibold" >Add Lead</span>
        </Button>
      </div>
    </div>
  </>
    
  )
}