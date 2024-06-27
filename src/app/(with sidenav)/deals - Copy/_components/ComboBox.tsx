"use client"

import * as React from "react"

import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export type Combobox = {
    id:string;
    name: string;
    color: string; 
    textColor: string; 
  };
  


  type ComboBoxResponsiveProps = {
    defaultname?: string;
    statuses :Combobox[] // Optional prop for default button label
  };

export function ComboBoxResponsive({ defaultname = "+ Set status",statuses}: ComboBoxResponsiveProps) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [selectedStatus, setSelectedStatus] = React.useState<Combobox| null>(
    null
  )
  const buttonStyle = selectedStatus
  ? { backgroundColor: selectedStatus.color,
        color: selectedStatus.textColor,
   }
  : {};

  const buttonContent = selectedStatus ? selectedStatus.name : defaultname;
  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" style={buttonStyle} className="w-[150px] justify-center rounded-full text-center font-bold text-sm">
            {buttonContent}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} statuses={statuses} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" style={buttonStyle} className="w-[150px] justify-center rounded-full text-center font-bold text-sm">
            {buttonContent}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} statuses={statuses} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function StatusList({
  setOpen,
  setSelectedStatus,
  statuses,
}: {
  setOpen: (open: boolean) => void
  setSelectedStatus: (status: Combobox | null) => void
  statuses: Combobox[];
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.name}
              value={status.name}
              onSelect={(name) => {
                setSelectedStatus(
                  statuses.find((priority) => priority.name === name) || null
                )
                setOpen(false)
              }}
            >
              {status.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
