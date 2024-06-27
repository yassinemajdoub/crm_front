"use client";
import SelectViewMode from "./_components/SelectViewMode";
import FilterBy from "./_components/FilterBy";
import ItemsSearch from "./_components/ItemsSearch";
import AddDeals from "./_components/AddDeals";
import DataTable from "./_components/listView/DataTable";
import ColumnsView from "./_components/columnsView/ColumnsView";
import CardsView from "./_components/cardsView/CardsView";
import ToggleConfigBar from "./_components/ToggleConfigBar";
import { fetchLeads } from "./utils/fetchLeads";
import { useLeadsStore } from "@/sotres/leadsStore";
import { useEffect } from "react";

type ViewModes = "listMode" | "columnsMode" | "cardsMode";

export default function Home({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const viewMode = searchParams["viewMode"] ?? "listMode";
    const setLeads = useLeadsStore((state) => state.setLeads);

    useEffect(() => {
        const loadLeads = async () => {
          const { data, error } = await fetchLeads(); 
    
          if (!error) {
            setLeads(data); 
          } else {
            console.error("Error fetching leads:", error);
          }
        };
    
        loadLeads(); 
      }, [setLeads]); 

    return (
        <section className="max-w-[100vw] bg-white rounded-2xl px-[40px] h-full min-h-[96vh] relative">
            <section className="flex items-center">
                <h1 className="text-[40px] text-[#202020]/90 font-semibold pt-[20px]">
                    Leads
                </h1>
                <div className="flex items-center gap-[8px] ml-auto mt-[20px]">
                    <ItemsSearch className="ml-auto" />
                    <SelectViewMode />
                    <FilterBy />
                    <AddDeals />
                </div>
            </section>

            <ToggleConfigBar />
            <section className="mt-[40px]">
                {viewMode === "listMode" && (
                    <DataTable
                        searchTextParam={searchParams?.search?.toString()}
                    />
                )}
                {viewMode === "columnsMode" && (
                    <ColumnsView
                        searchTextParam={searchParams?.search?.toString()}
                    />
                )}
                {viewMode === "cardsMode" && (
                    <CardsView
                        searchTextParam={searchParams?.search?.toString()}
                    />
                )}
            </section>
        </section>
    );
}
