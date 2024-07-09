"use client"

import { useDealsStore } from "@/sotres/dealsStore"
import { useEffect } from "react"
import Card from "./Card"

export default function CardsView(props: { searchTextParam?: string }) {
    const searchByName = useDealsStore(state => state.searchByName)
    const visibleDeals = useDealsStore(state => state.visibleItems)

    useEffect(() => {
        searchByName(props.searchTextParam ?? "")
    }, [props.searchTextParam])


    return <div className="grid lg:grid-cols-4 gap-x-[20px] gap-y-[14px]">
        {
            visibleDeals.map(deal => <Card key={deal.id} {...deal} />)
        }

    </div>
}