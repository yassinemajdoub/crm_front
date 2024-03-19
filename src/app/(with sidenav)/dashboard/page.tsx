import SelectViewMode from "./_components/SelectViewMode";
import FilterBy from "./_components/FilterBy";
import ItemsSearch from "./_components/ItemsSearch";
import AddDeals from "./_components/AddDeals";
import DataTable from "./_components/DataTable";

export default function Home({ searchParams, }
  : {
    searchParams: { [key: string]: string | string[] | undefined }
  }) {
  return (
    <section className="bg-[rgb(244,246,248)] rounded-2xl px-[40px] mt-[20px]  h-full min-h-[96vh]">
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
        <DataTable searchTextParam={searchParams?.search?.toString()} />
      </section>

    </section>
  );
}
