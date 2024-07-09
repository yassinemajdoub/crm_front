"use client";

import { Input } from "@/components/ui/input";
import { MoreHorizontal } from "lucide-react";
import { ComboBoxResponsive, Combobox } from "../ComboBox";
import { useLeadsStore,Lead } from "@/sotres/leadsStore";
import { useEffect } from "react";
import { fetchStagesAndStatuses } from "../../utils/fetchLeads";

export const revalidate = 1

type Props = {} & Lead;

export default function TableItem({ id, isSelected, ...props }: Props) {
    const statuses: Combobox[] = [
        {
            id:"1",
          name: "Backlog",
          color: "#f0ad4e", // Orange
          textColor: "#000000", // Black
        },
        {
            id:"1",
          name: "Todo",
          color: "#0275d8", // Blue
          textColor: "#ffffff", // White
        },
        {
            id:"1",
          name: "In Progress",
          color: "#5bc0de", // Light Blue
          textColor: "#000000", // Black
        },
        {
            id:"1",
          name: "Done",
          color: "#5cb85c", // Green
          textColor: "#ffffff", // White
        },
        {
            id:"1",
          name: "Canceled",
          color: "#d9534f", // Red
          textColor: "#ffffff", // White
        },
      ];

    const setStages = useLeadsStore((state) => state.setStages); // Example action in the store
    const setStatuses = useLeadsStore((state) => state.setStatuses);


    useEffect(() => {
        const loadStagesAndStatuses = async () => {
          const { stages, statuses, error } = await fetchStagesAndStatuses();
    
          if (!error) {
            setStages(stages); // Update the store with stages
            setStatuses(statuses); // Update the store with statuses
          } else {
            console.error("Error fetching stages and statuses:", error);
          }
        };
    
        loadStagesAndStatuses(); 
      }, [setStages, setStatuses]); // Ensure dependencies are correct

      const stagesList = useLeadsStore((state) => state.stages);
      const statuesList = useLeadsStore((state) => state.statuses);

    const selectItem = useLeadsStore((state) => state.selectItem);
    const unSelectItem = useLeadsStore((state) => state.unSelectItem);
    const { stringAndBooleanCols } = useLeadsStore();
    const visibleCols = useLeadsStore((state) => state.tableColumns.filter((col) => col.isSelected));

    const handleChange = () => {
        if (isSelected) { 
          unSelectItem(id);
        } else {
          selectItem(id);
        }
      };

    return (
        <tr
            className="text-center relative hover:scale-[102%] h-[75px] transition-all hover:shadow-md hover:border-transparent border border-y-black/10"
        >
            <td>
                {isSelected && (
                    <span className="w-[7px] rounded-r-[8px] absolute top-0 left-0 h-full bg-[#1D1DCE]"></span>
                )}
                <Input
                    onChange={handleChange}
                    checked={isSelected}
                    className="ml-[20px] w-[20px] accent-[#1D1DCE]"
                    type="checkbox"
                />
            </td>

            {visibleCols.map((col, index) => {
                const colName = col.name
                const field = (props as any)[colName]; // Reference props, not lead

                if (colName==="status") {
                    return (
                        <td key={index}>
                            <ComboBoxResponsive defaultname={`+ Choose ${colName}`} statuses={statuesList} />
                        </td>
                    );
                }

                if (colName==="stage") {
                    return (
                        <td key={index}>
                            <ComboBoxResponsive defaultname={`+ Choose ${colName}`} statuses={stagesList} />
                        </td>
                    );
                }

                if (stringAndBooleanCols.includes(colName)) {
                    return (
                        <td key={index} className="overflow-hidden">
                            {typeof field === "boolean" ? (field ? "True" : "False") : field}
                        </td>
                    );
                }

                return null; 
            })}

            <td>
                <MoreHorizontal className="hover:bg-black/10 rounded-[4px] hover:cursor-pointer w-[28px]" />
            </td>
        </tr>
    );
}