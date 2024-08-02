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

type Status = {
    value: string;
    label: string;
    color: string; // Background color
    textColor: string; // Text color
  };
  
  const statuses: Status[] = [
    {
      value: "backlog",
      label: "Backlog",
      color: "#f0ad4e", // Orange
      textColor: "#000000", // Black
    },
    {
      value: "todo",
      label: "Todo",
      color: "#0275d8", // Blue
      textColor: "#ffffff", // White
    },
    {
      value: "in progress",
      label: "In Progress",
      color: "#5bc0de", // Light Blue
      textColor: "#000000", // Black
    },
    {
      value: "done",
      label: "Done",
      color: "#5cb85c", // Green
      textColor: "#ffffff", // White
    },
    {
      value: "canceled",
      label: "Canceled",
      color: "#d9534f", // Red
      textColor: "#ffffff", // White
    },
  ];

  type ComboBoxResponsiveProps = {
    defaultLabel?: string; // Optional prop for default button label
  };

export function ComboBoxResponsive({ defaultLabel = "+ Set status" }: ComboBoxResponsiveProps) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  )
  const buttonStyle = selectedStatus
  ? { backgroundColor: selectedStatus.color,
        color: selectedStatus.textColor,
   }
  : {};

  const buttonContent = selectedStatus ? selectedStatus.label : defaultLabel;
  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" style={buttonStyle} className="w-[150px] justify-center rounded-full text-center font-bold text-sm">
            {buttonContent}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
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
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function StatusList({
  setOpen,
  setSelectedStatus,
}: {
  setOpen: (open: boolean) => void
  setSelectedStatus: (status: Status | null) => void
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelectedStatus(
                  statuses.find((priority) => priority.value === value) || null
                )
                setOpen(false)
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
