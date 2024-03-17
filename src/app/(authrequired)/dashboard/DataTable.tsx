"use client"

import Sort from "@/components/svg/Sort";
import { Input } from "@/components/ui/input";
import { useDashboardData } from "@/providers/dashboardContext";
import { MoreHorizontal } from "lucide-react";
import OtherPages from "./OtherPages";

export default function DataTable() {
    const { data } = useDashboardData()
    return <>
        <table className=" rounded-t-[24px]   rounded-b-[24px] shadow-md overflow-hidden  border-collapse  w-full">
            <thead className="bg-white rounded-lg h-[70px]  ">
                <tr className="rounded-full  text-[18px]" >
                    <th className="  text-center font-medium w-[20px]"><Input className=" ml-[20px] w-[20px]" type="checkbox" /></th>
                    <th className="text-center font-medium relative" >Name<Sort className="absolute right-[10%] top-1/2 -translate-y-1/2" /></th>
                    <th className="text-center font-medium relative" >Owner <Sort className="absolute right-[10%] top-1/2 -translate-y-1/2" /></th>
                    <th className="text-center font-medium relative" >Last contact <Sort className="absolute right-[10%] top-1/2 -translate-y-1/2" /></th>
                    <th className="text-center font-medium relative" >Company name <Sort className="absolute right-[10%] top-1/2 -translate-y-1/2" /></th>
                    <th className="text-center font-medium relative" >Work <Sort className="absolute right-[10%] top-1/2 -translate-y-1/2" /></th>
                    <th className="text-center font-medium relative" >Last stage <Sort className="absolute right-[10%] top-1/2 -translate-y-1/2" /></th>
                    <th className="text-center font-medium " ></th>
                </tr>
            </thead>
            <tbody className="bg-white text-[16px] overflow-hidden border-spacing-0">
                {data.map(item => (
                    <tr className="text-center hover:scale-[102%] h-[75px]  transition-all hover:shadow-md hover:border-transparent border border-y-black/10" key={item.id}>
                        <td><Input className=" ml-[20px] w-[20px]" type="checkbox" /></td>
                        <td>{item.name}</td>
                        <td>{item.owner}</td>
                        <td>{item.lastContact}</td>
                        <td>{item.companyName}</td>
                        <td>{item.work}</td>
                        <td>{item.lastStage}</td>
                        <td><MoreHorizontal /></td>
                    </tr>
                ))}
            </tbody>
            <tfoot className="h-[50px] bg-white ">
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
        <OtherPages />
    </>
}