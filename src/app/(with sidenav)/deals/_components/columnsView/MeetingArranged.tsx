import { useDealsStore } from "@/sotres/dealsStroe"
import ColumnsViewElement from "./ColumnViewElement"
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

export default function MeetingArranged() {
    const deals = useDealsStore(state => state.visibleItems)
    const { setNodeRef, isOver, active, rect } = useDroppable({
        id: 'meetingArranged',
    });

    return <section ref={setNodeRef} className={cn("min-h-[70vh]  transition-transform", { "-translate-y-[10px] ": isOver })}>

        <div className="bg-[#0EA5E9]/30 h-[90p] rounded-[16px]  flex flex-col p-[20px]">
            <span className="text-[18px] font-semibold">Meeting Arranged</span>
            <span className="text-black/30 font-medium mt-[4px]">$209,200 | 4 Deals</span>
        </div>
        <div className="flex flex-col mt-[20px] gap-[10px]">
            {deals.map(deal => (deal.status === "meetingArranged" ? <ColumnsViewElement key={deal.id} {...deal} /> : null))}
        </div>
    </section>
}