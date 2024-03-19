"use client"


import OtherPages from "./OtherPages";
import { useDashboardStore } from '@/sotres/dashboardStroe';
import TableItem from "./TableItem";
import TableHead from "./TableHead";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";


export default function DataTable(props: { searchTextParam?: string }) {
    const visibleItems = useDashboardStore(state => state.visibleItems)
    const searchByName = useDashboardStore(state => state.searchByName)
    useEffect(() => {
        searchByName(props.searchTextParam ?? "")
    }, [props.searchTextParam])
    return <>
        <table className=" rounded-t-[24px]   rounded-b-[24px] shadow-md overflow-hidden  border-collapse  w-full">
            <TableHead />
            <tbody className="bg-white text-[16px] overflow-hidden border-spacing-0">

                {visibleItems.map(item => (
                    <TableItem key={item.id} {...item} />
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