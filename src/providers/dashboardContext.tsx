"use client"

import { ReactNode, createContext, useContext, useState } from "react"


type Item = {
    id: string;
    name: string;
    owner: string;
    lastContact: string;
    companyName: string;
    work: string;
    lastStage: number;
}

type ContextProps = {
    data: Item[]
}

const dashboardDataContext = createContext<ContextProps | null>(null)

export default function DashboardContextProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState([
        { id: "1", name: "Web Form", owner: "Kathryn Murphy", lastContact: "Mar 02, 2019", companyName: "Blue Hawk", work: "Confined Space", lastStage: 100 },
        { id: "2", name: "Twitter Ads", owner: "Devon Lane", lastContact: "Mar 22, 2013", companyName: "Samsung", work: "Blasting", lastStage: 156 },
        { id: "3", name: "Online", owner: "Jane Cooper", lastContact: "Mar 02, 2019", companyName: "Amanda", work: "Excavation Works", lastStage: 100 },
        { id: "4", name: "Online Meeting", owner: "Kathryn Murphy", lastContact: "Mar 02, 2019", companyName: "Blue Hawk", work: "Confined Space", lastStage: 100 },
        { id: "5", name: "Web Form", owner: "Kathryn Murphy", lastContact: "Mar 02, 2019", companyName: "Blue Hawk", work: "Confined Space", lastStage: 100 },
        { id: "6", name: "Web Form", owner: "Kathryn Murphy", lastContact: "Mar 02, 2019", companyName: "Blue Hawk", work: "Confined Space", lastStage: 100 },
        { id: "7", name: "Web Form", owner: "Kathryn Murphy", lastContact: "Mar 02, 2019", companyName: "Blue Hawk", work: "Confined Space", lastStage: 100 }
    ])

    return <dashboardDataContext.Provider value={{ data }}>
        {children}
    </dashboardDataContext.Provider>
}

export function useDashboardData() {
    const contextData = useContext(dashboardDataContext)
    if (!contextData) {
        throw new Error("useDashboardData must be used within DashboardContextProvider")
    }
    return contextData
}