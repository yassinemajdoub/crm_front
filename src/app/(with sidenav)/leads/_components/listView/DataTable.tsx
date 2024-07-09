"use client";

import OtherPages from "./OtherPages";
import TableItem from "./TableItem";
import TableHead from "./TableHead";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useLeadsStore } from "@/sotres/leadsStore";

export const revalidate = 1

export default function DataTable(props: { searchTextParam?: string }) {
    const visibleItems = useLeadsStore((state) => state.visibleItems);
    const searchByName = useLeadsStore((state) => state.searchByName);
    const tableColumns = useLeadsStore((state) => state.tableColumns);

    useEffect(() => {
        searchByName(props.searchTextParam ?? "");
    }, [props.searchTextParam]);
    return (
        <div className="relative w-[1250px]">
            <div className="overflow-x-scroll border-4">
                <table
                    className=" rounded-t-[24px] rounded-b-[24px] shadow-md border-collapse w-full"
                    style={{ tableLayout: "fixed" }}>
                    <TableHead />
                    <tbody className="bg-white text-[16px] border-spacing-0">
                        {visibleItems.map((item) => (
                            <TableItem key={item.id} {...item} />
                        ))}
                    </tbody>
                    <tfoot className="h-[50px] bg-white ">
                        <tr>
                            {tableColumns.map((col) => (
                                <td key={col.name}></td>
                            ))}
                        </tr>
                    </tfoot>
                </table>
            </div>
            <OtherPages />
        </div>
    );
}
