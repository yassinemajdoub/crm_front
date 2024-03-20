import { Deal } from "@/sotres/dealsStroe"

type Props = {} & Deal

export default function Card(props: Props) {
    return <div className="h-[330px] p-[20px] hover:border-black/30 hover:shadow-sm transition-colors border bg-white  shadow rounded-[20px]">
        <span className="bg-[#1D1DCE] block w-[50px] h-[50px] rounded-[8px]"></span>
        <span className="block text-[18px] font-semibold mt-[12px]">Sebo Studio</span>
        <span className="block font-medium ">IT & Software, Service</span>
        <p className="mt-[8px] text-neutral-500 ">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque lauda…</p>
        <button className="border-2 px-[10px] border-[#775DA6] rounded-[10px] p-[4px] mt-[20px] hover:bg-[#775DA6] hover:text-white transition-colors ">2 Jobs</button>
    </div>
}