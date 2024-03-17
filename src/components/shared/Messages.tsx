import { MessageSquare } from "lucide-react"
import { DropdownMenuContent, DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export default function Messages({ className }: { className?: string }) {
    return <DropdownMenu >
        <DropdownMenuTrigger className={cn("focus:outline-0 ", className)} >
            <div className="  relative ">
                <MessageSquare className="stroke-black/30" />
                <span className="absolute bg-[#1D1DCE] rounded-full  -top-[5px] -right-[6px] w-[18px] flex items-center justify-center h-[18px]  text-[10px] font-bold text-white" >3 </span>
            </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className=" relative w-56 min-h-56 dark:bg-[#3c3c3c]">
            <p className="absolute top-1/2 -translate-y-1/2 w-full text-center text-neutral-400">No Messages.</p>
        </DropdownMenuContent>
    </DropdownMenu>
}