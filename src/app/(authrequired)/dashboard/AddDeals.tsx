import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function AddDeals() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="w-[160px] text-white px-0 h-[50px] rounded-lg pl-[10px]  justify-between flex items-center font-semibold text-[18px]  dark:text-white/80  bg-[#1D1DCE] border  py-0">
                Add Deals
                <span className="h-full border-l-2 border-white/90 w-[40px] justify-center  flex items-center ">
                    <ChevronDown />
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0">
                <DropdownMenuItem className='focus:bg-[#1D1DCE]/10  p-[12px]'>Import Leads</DropdownMenuItem>
                <DropdownMenuItem className='focus:bg-[#1D1DCE]/10  p-[12px]'>Import Notes</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
