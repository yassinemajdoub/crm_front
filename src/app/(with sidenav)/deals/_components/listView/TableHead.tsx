"use client"


import Sort from "@/components/svg/Sort";
import Trash from "@/components/svg/Trash";
import TrashListView from "@/components/svg/TrashListView";
import { Input } from "@/components/ui/input";
import { useDealsStore } from "@/sotres/dealsStroe";
import { useEffect, useState } from "react";

export default function TableHead() {
    const [isAllSelected, setIsAllSelected] = useState(false)
    const selectAllItems = useDealsStore(state => state.selectAllItems)
    const unSelectAllItems = useDealsStore(state => state.unSelectAllItems)
    const selectedItemCount = useDealsStore((state) => state.getSelectedItemsCount());

    useEffect(() => {
        isAllSelected ? selectAllItems() : unSelectAllItems()
    }, [isAllSelected])

    const toggleIsAllChecked = () => {
        setIsAllSelected(!isAllSelected)
    }
    const handleTrashClicks = () => {
        console.log(`${selectedItemCount} deleted`)
    }



    if (selectedItemCount > 0) {
        return  <thead className="bg-white rounded-lg h-[70px]">
        <tr className="rounded-full text-[18px] bg-indigo-50">
            <th className="text-center font-medium w-[20px]" colSpan={13}>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center">
                        <Input onChange={toggleIsAllChecked} checked={isAllSelected} className=" ml-[20px] w-[20px] accent-[#1D1DCE]" type="checkbox" />
                        <div className="w-[145px] text-center text-slate-950 text-lg font-semibold">{selectedItemCount} Selected</div>
                    </div>
                    <div className="flex flex-row items-center px-6">
                        <TrashListView className="" onClick={handleTrashClicks}/>
                    </div>
                </div>
            </th>
        </tr>
    </thead>
    }

    return <thead className="bg-white rounded-lg h-[70px]">
            <tr className="rounded-full text-[18px] bg-indigo-50" >
                <th className="text-center font-medium w-[100px] pl-2"><Input onChange={toggleIsAllChecked} checked={isAllSelected} className=" ml-[20px] w-[20px] accent-[#1D1DCE" type="checkbox" /></th>
                <th className="text-center font-medium w-[200px]" >Name</th>
                <th className="text-center font-medium w-[200px]" >Owner </th>
                <th className="text-center font-medium w-[200px]" >Last contact </th>
                <th className="text-center font-medium w-[200px]" >Company name </th>
                <th className="text-center font-medium w-[200px]" >Work </th>
                <th className="text-center font-medium w-[200px]" >Work </th>
                <th className="text-center font-medium w-[200px]" >Work </th>
                <th className="text-center font-medium w-[200px]" >Last stage </th>
                <th className="text-center font-medium w-[200px]" >Last stage </th>
                <th className="text-center font-medium w-[200px]" >Last stage </th>
                <th className="text-center font-medium w-[100px]" ></th>
            </tr>
        </thead>
}