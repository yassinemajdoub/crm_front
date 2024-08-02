"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import Select from 'react-select';
import { Button } from "@/app/(with sidenav)/leads-shadcn/_components/NewyorkButton"
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from "@/app/(with sidenav)/leads-shadcn/_components/NewyorkInput";
import { DataTableViewOptions } from "@/app/(with sidenav)/leads-shadcn/_components/DataTableViewoptions";
import {
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

import KpiEmail2 from "@/components/svg/kpiEmail2";
import { DialogDemo } from "../_components/DialogueAddEmail";
import { useEffect, useState } from "react";
import { fetchBusinessSectors, fetchLeads, fetchNiches, fetchTags } from "@/app/(with sidenav)/(removed)/leads/utils/fetchLeads";
import { fetchEmailTemplates } from "../utils/fetchemails";




interface DataTableToolbarProps<TData> {
  table: Table<TData>,
  params:{
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
  const [nicheOptions, setNicheOptions] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [businessSectorOptions, setBusinessSectorOptions] = useState([]);
  const [leadOptions, setLeadOptions] = useState([])
  const [templateOptions, setTemplateOptions] = useState([])

  useEffect(() => {
    async function loadOptions() {
      const { niches } = await fetchNiches();
      setNicheOptions(niches);
        
      const { tags } = await fetchTags();
      setTagOptions(tags);

      const { sectors } = await fetchBusinessSectors();
      setBusinessSectorOptions(sectors);
      const { data: leads } = await fetchLeads();
      setLeadOptions(leads.map((lead: any) => lead.options));

      const { templates } = await fetchEmailTemplates();
      setTemplateOptions(templates);
    }
    loadOptions();
  }, []);
  // console.log("tagOptions",tagOptions)
  // console.log("businessSectorOptions",businessSectorOptions)
  // console.log("nicheOptions",nicheOptions)
  // console.log("templateOptions",templateOptions)
  // console.log("leadOptions",leadOptions)
  return (
    <>
    <div className="flex flex-col">
      <div className="flex items-center justify-between p-3">
        <h1 className="text-[40px] text-[#202020]/90 font-semibold">
          E-mails
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
        <DataTableViewOptions table={table} />
        <DialogDemo 
        nicheOptions={nicheOptions} 
        tagOptions={tagOptions} 
        businessSectorOptions={businessSectorOptions} 
        templateOptions={templateOptions} 
        leadOptions={leadOptions} 
        params={params}
      />
        {/* <Button className="justify-center text-white px-2 h-[50px] rounded-lg flex items-center font-semibold text-[18px] dark:text-white/80  hover:bg-blue-800 bg-[#1D1DCE] border  py-0">
              <Plus className="p-[1px] stroke-[2] mr-[8px]" />
              <span className="text-white text-sm font-semibold" >Add Lead</span>
          </Button> */}
        </div>
      </div>
      <div className="flex gap-4 h-[150px] p-3">

        <div className="flex gap-[25px] max-w-[262px] h-[116px] p-5 bg-white rounded-lg shadow-2xl justify-center">
            <div className="flex flex-col gap-1 justify-center">
              <div className="w-[124px] text-right pr-3 text-gray-400 text-base font-normal font-['Poppins'] leading-7">Cliked emails</div>
              <div className="w-[124px] text-right pr-3 text-slate-800 text-base font-normal font-['Poppins'] leading-7">344</div>
            </div>
            <KpiEmail2 />
        </div>
        <div className="flex gap-[25px] max-w-[262px] h-[116px] p-5 bg-white rounded-lg shadow-2xl justify-center">
            <div className="flex flex-col gap-1 justify-center">
              <div className="w-[124px] text-right pr-3 text-gray-400 text-base font-normal font-['Poppins'] leading-7">Cliked emails</div>
              <div className="w-[124px] text-right pr-3 text-slate-800 text-base font-normal font-['Poppins'] leading-7">344</div>
            </div>
            <KpiEmail2 />
        </div>
        <div className="flex gap-[25px] max-w-[262px] h-[116px] p-5 bg-white rounded-lg shadow-2xl justify-center">
            <div className="flex flex-col gap-1 justify-center">
              <div className="w-[124px] text-right pr-3 text-gray-400 text-base font-normal font-['Poppins'] leading-7">Cliked emails</div>
              <div className="w-[124px] text-right pr-3 text-slate-800 text-base font-normal font-['Poppins'] leading-7">344</div>
            </div>
            <KpiEmail2 />
        </div>
        <div className="flex gap-[25px] max-w-[262px] h-[116px] p-5 bg-white rounded-lg shadow-2xl justify-center">
            <div className="flex flex-col gap-1 justify-center">
              <div className="w-[124px] text-right pr-3 text-gray-400 text-base font-normal font-['Poppins'] leading-7">Cliked emails</div>
              <div className="w-[124px] text-right pr-3 text-slate-800 text-base font-normal font-['Poppins'] leading-7">344</div>
            </div>
            <KpiEmail2 />
        </div>

      </div>
    </div>
  </>
    
  )
}