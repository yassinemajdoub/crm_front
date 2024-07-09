"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Lead, useLeadsStore } from "@/sotres/leadsStore"
import { Combobox, ComboBoxResponsive } from "../leads/_components/ComboBox";
import { useEffect } from "react";
import { fetchStagesAndStatuses } from "../leads/utils/fetchLeads";
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

// export type Lead = {
//   id: string;
//   name: string;
//   owner: string;
//   phone?: string; 
//   source?: string; 
//   TINumber?: string; 
//   email?: string;
//   tags: string[];
//   photo:string;
//   stage?: Status; 
//   status?: Status; 
//   description?: string; 
//   business_sector?: string; 
//   rating?: number; 
//   isSelected?: boolean; 
//   has_website?: boolean; 
//   spending_on_ads?: boolean; 
//   number_of_employes?: number;
//   annual_revenue?: string;
//   contacts?: { first_name: string; last_name: string;gender:string }[]; 
//   niches?: string[]; 
// };

export interface DataTableProps {
  columns: ColumnDef<Lead>[];
  data: Lead[];
}


export const columns: ColumnDef<Lead>[] = [
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
    }
  },
  {
    accessorKey: "owner",
    header: "Owner",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "source",
    header: "Source",
  },
  {
    accessorKey: "TINumber",
    header: "TINumber",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  // {
  //   accessorKey: "tags",
  //   header: "Tags",
  // },
  {
    accessorKey: "photo",
    header: "Photo",
    cell: ({ row }) => {
      const photo = row.original.photo;
      return <div className='font-medium'>Photo: {photo}</div>;
    }
  },
  {
    accessorKey: "stage",
    header: "Stage",
    cell: ({ row }) => {
      const stage = row.original.stage;
      const setStages = useLeadsStore((state) => state.setStages);

  
      useEffect(() => {
          const loadStagesAndStatuses = async () => {
            const { stages,error } = await fetchStagesAndStatuses();
      
            if (!error) {
              setStages(stages); // Update the store with stages
            } else {
              console.error("Error fetching stages and statuses:", error);
            }
          };
      
          loadStagesAndStatuses(); 
        }, [setStages]);
        const stagesList = useLeadsStore((state) => state.stages);
      return <ComboBoxResponsive defaultname={"+ Choose Status"} statuses={stagesList} selectedStatus={stage} />
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const setStatuses = useLeadsStore((state) => state.setStatuses);
  
  
      useEffect(() => {
          const loadStagesAndStatuses = async () => {
            const { statuses, error } = await fetchStagesAndStatuses();
      
            if (!error) {
              setStatuses(statuses); // Update the store with statuses
            } else {
              console.error("Error fetching stages and statuses:", error);
            }
          };
      
          loadStagesAndStatuses(); 
        }, [setStatuses]);
        const statuesList = useLeadsStore((state) => state.statuses);

        const selectedStatus: Combobox | null = status ?? null;
        
      return <ComboBoxResponsive defaultname={"+ Choose Status"} statuses={statuesList} selectedStatus={selectedStatus} />
    }
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  // {
  //   accessorKey: "business_sector",
  //   header: "Business Sector",
  // },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  // {
  //   accessorKey: "isSelected",
  //   header: "Is Selected",
  // },
  {
    accessorKey: "has_website",
    header: "Has Website",
  },
  {
    accessorKey: "spending_on_ads",
    header: "Spending on Ads",
  },
  {
    accessorKey: "number_of_employes",
    header: "Number of Employees",
  },
  {
    accessorKey: "annual_revenue",
    header: "Annual Revenue",
  },
  // {
  //   accessorKey: "contacts",
  //   header: "Contacts",
  // },
  // {
  //   accessorKey: "niches",
  //   header: "Niches",
  // },
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
              onClick={() => navigator.clipboard.writeText(payment.id)}
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