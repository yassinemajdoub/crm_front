import Calender from '@/components/svg/Calendar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,

    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react';

export default function FilterBy() {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger className="w-[130px] bg-white h-[50px] rounded-lg px-[10px] justify-between flex items-center font-semibold text-[18px] text-black/80 dark:text-white/80  border-[#1D1DCE] border  py-0" >
                <Calender pathClassName="fill-[#1D1DCE]" className="w-[30px]   h-full stroke-[0] " />
                Filter
                <ChevronDown className="stroke-[#1D1DCE] stroke-[2] mt-[2px] opacity-80 mr-[4px]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0">
                <DropdownMenuItem ><ChevronDown className="mr-[4px]" />  System Defined Filters</DropdownMenuItem>
                <DropdownMenuItem ><ChevronDown className="mr-[4px]" />  Filter By Fields</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
