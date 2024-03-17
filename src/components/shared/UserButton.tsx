import Image from "next/image"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,

} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"


export default function UserButton({ className }: { className?: string }) {

    return <DropdownMenu >
        <DropdownMenuTrigger className={cn("focus:outline-0   md:hover:bg-black/5  rounded-l-xl rounded-r-full md:ml-[40px] ", className)} >
            <div className="flex  rounded-r-full  pl-[20px] items-center">
                <p className="ml-auto md:block hidden">Hello, Samantha</p>
                <div className=" ml-[10px] flex items-center">
                    <div className="w-[52px] h-[52px] flex bg-gradient-to-br items-center justify-center from-[#3333df] to-[#3333df] rounded-full">
                        {/* <Image width={45} height={45} className="rounded-full" alt={""} src={""} /> */}
                        <div className="w-[43px] h-[43px] mx-[1px] mt-[1px] rounded-full bg-neutral-300  "></div>

                    </div>
                </div>
            </div >
        </DropdownMenuTrigger>

        <DropdownMenuContent className=" relative w-[220px] ml-[40px] p-0" >
            <div className="w-full dark:text-white shadow-sm hover:bg-[#7406FFD6]/10 hover:text-[#7406FFD6] px-2 text-[16px] py-2 text-black/70 hover:cursor-pointer font-medium">Manage the account</div>
            <div className="w-full dark:text-white shadow-sm hover:bg-[#7406FFD6]/10 hover:text-[#7406FFD6] px-2 text-[16px] py-2 text-black/70 hover:cursor-pointer font-medium">Automation</div>
            <div className="w-full dark:text-white shadow-sm hover:bg-[#7406FFD6]/10 hover:text-[#7406FFD6] px-2 text-[16px] py-2 text-black/70 hover:cursor-pointer font-medium">My acompte</div>
            <div className="w-full dark:text-white shadow-sm hover:bg-[#7406FFD6]/10 hover:text-[#7406FFD6] px-2 text-[16px] py-2 text-black/70 hover:cursor-pointer font-medium">Add an acompte of team</div>
            <div className="w-full dark:text-white shadow-sm hover:bg-[#7406FFD6]/10 hover:text-[#7406FFD6] px-2 text-[16px] py-2 text-black/70 hover:cursor-pointer font-medium">Log out</div>
        </DropdownMenuContent>
    </DropdownMenu>

}
