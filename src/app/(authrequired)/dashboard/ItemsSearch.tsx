"use client"

import { FormEvent, FormHTMLAttributes } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

type Props = {} & FormHTMLAttributes<HTMLFormElement>

export default function ItemsSearch(props: Props) {
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return <form {...props} onSubmit={onSubmit} >
        <div className="relative w-[420px]">
            <Input type="text" placeholder="Search..." className=" w-full border border-[#1D1DCE]  focus-visible:border-none focus-visible:ring-[#1D1DCE]/40 font-medium pl-[40px]" />
            <Search className="absolute top-1/2 scale-90 -translate-y-1/2 stroke-[#1D1DCE]/80 left-[10px]" />
        </div>
    </form>
}