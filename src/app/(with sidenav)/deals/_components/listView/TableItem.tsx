"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Deal, useDealsStore } from "@/sotres/dealsStore";
import { MoreHorizontal } from "lucide-react";
import { ComboBoxResponsive } from "../ComboBox";

type Props = {} & Deal;

export default function TableItem(props: Props) {
    const selectItem = useDealsStore((state) => state.selectItem);
    const unSelectItem = useDealsStore((state) => state.unSelectItem);
    const tableCols = useDealsStore((state) => state.tableColumns);
    const visibleCols = tableCols
        .filter((col) => col.isSelected)
        .map((col) => col.name.toLowerCase());

    const handleChange = () => {
        if (props.isSelected) {
            unSelectItem(props.id);
        } else {
            selectItem(props.id);
        }
    };

    return (
        <tr className="text-center relative hover:scale-[102%] h-[75px]  transition-all hover:shadow-md hover:border-transparent border border-y-black/10">
            <td>
                {props.isSelected && (
                    <span className=" w-[7px] rounded-r-[8px] absolute top-0 left-0 h-full  bg-[#1D1DCE]"></span>
                )}
                <Input
                    onChange={handleChange}
                    checked={props.isSelected}
                    className=" ml-[20px] w-[20px] accent-[#1D1DCE]"
                    type="checkbox"
                />
            </td>
            {visibleCols.includes("name") && <td>{props.name}</td>}
            {visibleCols.includes("owner") && <td>{props.owner}</td>}
            {visibleCols.includes("last contact") && (
                <td>{props.lastContact}</td>
            )}
            {visibleCols.includes("company name") && (
                <td>{props.companyName}</td>
            )}
            {visibleCols.includes("work") && <td>{props.work}</td>}
            {visibleCols.includes("status") && <td><ComboBoxResponsive defaultLabel="+ Choose Status"/></td>}
            {visibleCols.includes("stage") && <td><ComboBoxResponsive defaultLabel="+ Choose Stage"/></td>}
            {visibleCols.includes("last stage") && <td className="relative">
                <span
                    className={cn(
                        "bg-[#1D1DCE]/20 left-1/2 text-[#1D1DCE]/80 absolute -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full min-w-[100px] py-[3px] font-bold h-fit",
                        { "bg-[#1D1DCE] text-white": props.isSelected }
                    )}>
                    {props.lastStage}
                </span>
            </td>}


            <td>
                <MoreHorizontal className="hover:bg-black/10 rounded-[4px] hover:cursor-pointer w-[28px]" />
            </td>
        </tr>
    );
}
