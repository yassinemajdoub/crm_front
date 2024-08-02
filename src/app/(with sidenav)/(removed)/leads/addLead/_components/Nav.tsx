import { cn } from "@/lib/utils"
import Link from "next/link"

type Props = {
    current: "create" | "quickCreate" | "detailView"
}

export default function Nav(props: Props) {
    return <nav className="flex gap-[48px] text-[20px] font-medium shadow w-full h-[70px] border-b border-b-black/5 items-center px-[90px]">
        <Link className={cn("hover:scale-[101%] transition-all hover:underline underline-offset-4", { "border-[#1D1DCE]/80 border-b-[3px] translate-y-[2px] text-[#1D1DCE] h-full flex items-center": props.current == "create" })} href={"/addDeal/create"}><span>Create</span></Link>
        <Link className={cn("hover:scale-[101%] transition-all hover:underline underline-offset-4", { "border-[#1D1DCE]/80 border-b-[3px] translate-y-[2px] text-[#1D1DCE] h-full flex items-center": props.current == "quickCreate" })} href={"/addDeal/quickCreate"}><span>Quick Create</span></Link>
        <Link className={cn("hover:scale-[101%] transition-all hover:underline underline-offset-4", { "border-[#1D1DCE]/80 border-b-[3px] translate-y-[2px] text-[#1D1DCE] h-full flex items-center": props.current == "detailView" })} href={"/addDeal/detailView"}><span>Detail View</span></Link>
    </nav>
}