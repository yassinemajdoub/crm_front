"use client"

import Analytics from "../svg/Analytics";
import SideNavCalender from "../svg/SideNavCalender";
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
import ToggleSideNav from "../svg/ToggleSideNav";
import { useState } from "react";
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import LogoSmall from "../svg/LogoSmall";
import Logout from "../svg/Logout";

export default function SideNav() {


    const router = useRouter()
    const currentRoute = usePathname()
    const [isOpen, setIsOpen] = useState(true)


    useGSAP(() => {

        if (isOpen) {
            gsap.to("#sideNav", { width: 300, duration: 0.2 })
            document.documentElement.style.setProperty("---main-margin-left", "300px");


        } else {
            gsap.to("#sideNav", { width: 80, duration: 0.2 })
            document.documentElement.style.setProperty("---main-margin-left", "80px");
        }

    }, [isOpen])


    const links = [
        { route: "/dashboard", title: "Dashboard", icon: Home },
        { route: "/companies", title: "Companies", icon: Companies },
        { title: "Leads", icon: Leads, subRoutes: [] },
        { title: "Deals", route: "/deals", icon: Deals, subRoutes: [] },
        { route: "/customers", title: "Customers", icon: Customers },
        { route: "/analytics", title: "Analytics", icon: Analytics },
        { route: "/reviews", title: "Reviews", icon: Reviews },
        { route: "/projects", title: "Projects", icon: Projects },
        { title: "Documents", icon: Documents, subRoutes: [] },
        { route: "/contact", title: "Contact", icon: Contact },
        { route: "/calender", title: "Calender", icon: SideNavCalender },
        { route: "/chat", title: "Chat", icon: Chat },
    ]

    const handleItemClick = (index: number) => {
        const route = links[index]?.route
        if (route) {
            router.push(route)
            return
        }
    }

    const toggleSideNav = () => setIsOpen(!isOpen)


    return <aside id="sideNav" className="w-[300px] shadow-[0px_4px_37.7px_rgba(0,0,0,0.10)]  bg-white min-h-[100vh] mr-[400px]     fixed left-0 ">
        {isOpen ? (
            <ToggleSideNav
                onClick={toggleSideNav}
                className="absolute top-[54px] -right-[12px]  p-0 hover:cursor-pointer hover:scale-105 transition-transform"
            />
        ) : (
            <ToggleSideNav
                onClick={toggleSideNav}
                className="absolute top-[54px] w-full -right-[48px] rotate-180 p-0 hover:cursor-pointer hover:scale-105 transition-transform"
            />
        )}{" "}

        <section className="w-full h-[130px] flex items-center pr-[20px] justify-center ">
            {isOpen ? <LogoBig /> : <LogoSmall className="ml-[20px] scale-110" />}
        </section>
        <section className="">
            {links.map((link, index) => <div onClick={() => handleItemClick(index)} className={cn("w-[95%] rounded-r-[6px] hover:bg-[#1D1DCE]/20 transition-colors hover:cursor-pointer gap-[30px] items-center  relative flex h-[45px]", { "bg-[#1D1DCE]/10 text-[#1D1DCE]/80 font-semibold ": currentRoute === link?.route }, { "mt-[10px] ": !isOpen })} key={link.title}>
                {currentRoute === link.route && <span className="block w-[6px] absolute left-0 top-0  rounded-r-[5px]  h-full bg-[#1D1DCE]"></span>}
                <link.icon className={cn("ml-[40px] w-[23px] h-[23px]", { "ml-[30px]": !isOpen })} />
                {isOpen && <span>{link.title}</span>}
                {!link?.route && isOpen && <ChevronRightIcon className="absolute stroke-black/60 right-[20px]" />}
            </div>)}
            <button className={cn("flex absolute  hover:bg-[#1D1DCE]/20 w-[95%] rounded-r-[6px] bottom-0 left-0 py-[8px] pl-[40px] text-[18px] gap-[25px] items-center", { "pl-[30px] bottom-[10px]": !isOpen })}><Logout />{isOpen && "Logout"}</button>
        </section>
    </aside>
}