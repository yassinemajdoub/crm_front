import { Plus } from "lucide-react";
import Link from "next/link";

export default function Addleads() {
    return (
        <Link href={"/addLeal"} className="w-[160px] justify-center text-white px-0  h-[50px] rounded-lg   flex items-center font-semibold text-[18px]  dark:text-white/80  bg-[#1D1DCE] border  py-0">
            <Plus className="p-[2px] stroke-[3] mr-[8px]" />
            <span >Add leads</span>
        </Link>
    );
}
