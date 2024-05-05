"use client"

import OtherPages from "./OtherPages";
import { useDealsStore } from '@/sotres/dealsStroe';
import TableItem from "./TableItem";
import TableHead from "./TableHead";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";


export default function DataTable(props: { searchTextParam?: string }) {
    const visibleItems = useDealsStore(state => state.visibleItems)
    const searchByName = useDealsStore(state => state.searchByName)

    useEffect(() => {
        searchByName(props.searchTextParam ?? "")
    }, [props.searchTextParam])
    return  <div className="relative w-[1250px]">
                <div className="overflow-x-scroll border-4">
                    <table className=" rounded-t-[24px] rounded-b-[24px] shadow-md border-collapse w-full"style={{ tableLayout: 'fixed' }}>
                        <TableHead />
                        <tbody className="bg-white text-[16px] border-spacing-0">

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
                </div>
                <OtherPages />
            </div>
}