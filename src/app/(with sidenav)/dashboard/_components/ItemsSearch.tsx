"use client"

import { ChangeEvent, FormEvent, FormHTMLAttributes } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { } from 'next/navigation'
type Props = {} & FormHTMLAttributes<HTMLFormElement>

export default function ItemsSearch(props: Props) {

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathName = usePathname()
    const params = new URLSearchParams(searchParams.toString())

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        params.set("search", e.target.value)
        router.replace(`${pathName}/?${params.toString()}`)
    }

    return <form {...props} onSubmit={handleSubmit} >
        <div className="relative w-[420px]">
            <Input onChange={handleChange} defaultValue={searchParams.get("search")?.toString()} type="text" placeholder="Search..." className=" w-full border border-[#1D1DCE]  focus-visible:border-none focus-visible:ring-[#1D1DCE]/40 font-medium pl-[40px]" />
            <Search className="absolute top-1/2 scale-90 -translate-y-1/2 stroke-[#1D1DCE]/80 left-[10px]" />
        </div>
    </form>
}