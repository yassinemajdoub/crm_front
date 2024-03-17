import SelectViewMode from "./SelectViewMode";
import FilterBy from "./FilterBy";
import ItemsSearch from "./ItemsSearch";
import AddDeals from "./AddDeals";
import DataTable from "./DataTable";
import DashboardContextProvider from "@/providers/dashboardContext";

export default function Home() {
  return (
    <section className="bg-[#f4f6f8] rounded-2xl px-[40px] mt-[20px]  h-full min-h-[96vh]">
      <DashboardContextProvider>

        <section className="flex items-center">
          <h1 className="text-[40px] text-[#202020]/90 font-semibold pt-[20px]">Deals</h1>
          <div className="flex items-center gap-[8px] ml-auto mt-[20px]">
            <ItemsSearch className="ml-auto" />
            <SelectViewMode />
            <FilterBy />
            <AddDeals />
          </div>
        </section>

        <section className="mt-[40px]">

          <DataTable />

        </section>
      </DashboardContextProvider>

    </section>
  );
}
