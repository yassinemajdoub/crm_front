"use client"

import Analytics from "../svg/Analytics";
import Calender from "../svg/Calendar";
import Chat from "../svg/Chat";
import Companies from "../svg/Companies";
import Contact from "../svg/Contact";
import Customers from "../svg/Customers";
import Deals from "../svg/Deals";
import Documents from "../svg/Documents";
import Home from "../svg/Home";
import Leads from "../svg/Lead";
import LogoBig from "../svg/LogoBig";
import Projects from "../svg/Projects";
import Reviews from "../svg/Reviews";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ChevronRightIcon } from "lucide-react"

export default function SideNav() {

    const router = useRouter()
    const currentRoute = usePathname()

    const links = [
        { route: "/dashboard", title: "Dashboard", icon: Home },
        { route: "/companies", title: "Companies", icon: Companies },
        { title: "Documents", icon: Documents, subRoutes: [] },
        { title: "Leads", icon: Leads, subRoutes: [] },
        { title: "Deals", icon: Deals, subRoutes: [] },
        { route: "/customers", title: "Customers", icon: Customers },
        { route: "/analytics", title: "Analytics", icon: Analytics },
        { route: "/reviews", title: "Reviews", icon: Reviews },
        { route: "/projects", title: "Projects", icon: Projects },
        { route: "/contact", title: "Contact", icon: Contact },
        { route: "/calender", title: "Calender", icon: Calender },
        { route: "/chat", title: "Chat", icon: Chat },
    ]

    const handleItemClick = (index: number) => {
        const route = links[index]?.route
        if (route) {
            router.push(route)
            return
        }
        // open the sub routed for the item
    }


    return <aside className="w-[300px] min-h-[100vh] mr-[400px]     fixed left-0 ">
        <section className="w-full h-[130px] flex items-center pr-[20px] justify-center ">
            <LogoBig />
        </section>
        <section className="">
            {links.map((link, index) => <div onClick={() => handleItemClick(index)} className={cn("w-[95%] rounded-r-[6px] hover:bg-[#1D1DCE]/20 transition-colors hover:cursor-pointer gap-[30px] items-center  relative flex h-[45px]", { "bg-[#1D1DCE]/10 text-[#1D1DCE]/80 font-semibold ": currentRoute === link?.route })} key={link.title}>
                {currentRoute === link.route && <span className="block w-[6px] absolute left-0 top-0  rounded-r-[5px]  h-full bg-[#1D1DCE]"></span>}
                <link.icon className="ml-[40px] w-[23px] h-[23px]" />
                <span>{link.title}</span>
                {!link?.route && <ChevronRightIcon className="absolute stroke-black/60 right-[20px]" />}
            </div>)}
        </section>
    </aside>
}