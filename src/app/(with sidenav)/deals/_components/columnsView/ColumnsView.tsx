"use client"

import LeadDiscoverd from "./LeadDiscoverd"
import ContactInitiated from "./ContactInitiated"
import MeetingArranged from "./MeetingArranged"
import OfferAccepted from "./OfferAccepted"
import { DndContext } from '@dnd-kit/core';

export default function ColumnsView() {
    return <section className=" grid grid-cols-4 xl:gap-[40px]">
        <DndContext>
            <LeadDiscoverd />
            <ContactInitiated />
            <MeetingArranged />
            <OfferAccepted />
        </DndContext>
    </section>
}