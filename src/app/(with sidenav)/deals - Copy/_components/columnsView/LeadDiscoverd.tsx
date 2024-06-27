import { useDealsStore } from "@/sotres/dealsStore"
import ColumnsViewElement from "./ColumnViewElement"
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";


export default function LeadDiscoverd() {
    const deals = useDealsStore(state => state.visibleItems)
    const { setNodeRef, isOver, active, rect } = useDroppable({
        id: 'leadDiscovered',
    });

    return <section ref={setNodeRef} className={cn("min-h-[70vh]  transition-transform", { "-translate-y-[10px] ": isOver })}>

        <div className="bg-[#1D1DCECC]/30 h-[90p] rounded-[16px]  flex flex-col p-[20px]">
            <span className="text-[18px] font-semibold">Lead Discovered</span>
            <span className="text-black/30 font-medium mt-[4px]">$209,200 | 4 Deals</span>
        </div>
        <div className="flex flex-col mt-[20px] gap-[10px]">
            {deals.map(deal => (deal.status === "leadDiscovered" ? <ColumnsViewElement key={deal.id} {...deal} /> : null))}
        </div>
    </section>

}