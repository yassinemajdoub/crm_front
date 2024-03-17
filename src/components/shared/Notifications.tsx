import { cn } from "@/lib/utils";
import Bell from "@/components/svg/Bell";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function NotificationsBell({ className }: { className?: string }) {
    return <DropdownMenu >
        <DropdownMenuTrigger className={cn("focus:outline-0 ", className)} >
            <div className="relative ">
                <Bell className="w-[20px] stroke-[1]  hover:scale-105 active:scale-100  transition-transform h-[30px]   stroke-black/50" />
                <span className="absolute bg-[#00B0FF] rounded-full  -top-[2px] -right-[6px] w-[18px] flex items-center justify-center h-[18px]  text-[10px] font-bold text-white" >2 </span>
            </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className=" relative w-56 min-h-56 dark:bg-[#3c3c3c]">
            <p className="absolute top-1/2 -translate-y-1/2 w-full text-center text-neutral-400">No notifications.</p>
        </DropdownMenuContent>
    </DropdownMenu>
}
