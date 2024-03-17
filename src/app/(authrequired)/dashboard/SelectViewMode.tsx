import Kanban from "@/components/svg/Kanban";
import TitleView from "@/components/svg/TitleView";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { List, ChevronDown } from "lucide-react";

export default function SelectViewMode() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="w-[80px] bg-white h-[50px] rounded-lg px-[10px] justify-between flex items-center font-semibold text-[18px] text-black/80 dark:text-white/80  border-[#1D1DCE] border  py-0">
                <List className="w-[30px] stroke-[#1D1DCE] h-[30px] stroke-[2.7]" />
                <ChevronDown className="stroke-[#1D1DCE] stroke-[2] mt-[2px] opacity-80" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0">
                <DropdownMenuItem className="flex items-center gap-[20px] focus:bg-[#1D1DCE]/10  p-[12px]">
                    <List className="w-[30px]  h-[30px] stroke-[2.7]" />
                    List View
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-[20px] focus:bg-[#1D1DCE]/10  p-[12px]">
                    <Kanban />
                    Kanban View
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-[20px] focus:bg-[#1D1DCE]/10  p-[12px]">
                    <TitleView />
                    Title Leads
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
