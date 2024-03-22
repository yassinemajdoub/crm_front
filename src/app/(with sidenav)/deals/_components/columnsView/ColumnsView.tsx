"use client"

import LeadDiscoverd from "./LeadDiscoverd"
import ContactInitiated from "./ContactInitiated"
import MeetingArranged from "./MeetingArranged"
import OfferAccepted from "./OfferAccepted"
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { DealStatus, useDealsStore } from "@/sotres/dealsStroe"
import { useEffect } from "react"

export default function ColumnsView(props: { searchTextParam?: string }) {
    const searchByName = useDealsStore(state => state.searchByName)

    useEffect(() => {
        searchByName(props.searchTextParam ?? "")
    }, [props.searchTextParam])


    const updateDealStatus = useDealsStore(state => state.updateItemStatus)
    const handleDragEnd = (event: DragEndEvent) => {
        const { over, active } = event;
        if (over && active.id) {
            updateDealStatus(active.id.toString(), over.id.toString() as DealStatus)
        }
    };

    return <section className=" grid relative grid-cols-4 xl:gap-[40px]">
        <DndContext onDragEnd={handleDragEnd}>
            <LeadDiscoverd />
            <ContactInitiated />
            <MeetingArranged />
            <OfferAccepted />
        </DndContext>
    </section>
}