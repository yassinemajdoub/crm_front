import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings } from "lucide-react";


export default function Header() {
    return <header className="h-[80px] shadow px-[40px] items-center flex border-b border-b-black/5">
        <ArrowLeft className="stroke-[2.5] hover:cursor-pointer  active:scale-95 py-[2px] hover:bg-black/5 rounded-[4px] w-[40px] h-[30px]" />
        <span className=" mx-[12px] text-[26px] font-medium">Leads</span>
        <span className="block w-[2px] h-[26px] border-2 border-black/30"></span>
        <Settings className="ml-[14px] stroke-black/80 hover:-rotate-[30deg] hover:cursor-pointer duration-300 transition-transform scale-105 " />
        <div className="ml-auto flex items-center gap-[6px]">
            <Button variant="outline" className="border active:scale-95 transition-transform border-[#1D1DCE]/70" >Cancel</Button>
            <Button variant="outline" className="border active:scale-95 transition-transform border-[#1D1DCE]/70" >Save and close</Button>
            <Button className="bg-[#1D1DCE] hover:bg-[#1D1DCE]/90 active:scale-95 transition-transform">Save</Button>
        </div>
    </header>
}