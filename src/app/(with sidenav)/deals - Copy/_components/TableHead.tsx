"use client";

import Sort from "@/components/svg/Sort";
import { Input } from "@/components/ui/input";
import { useDealsStore } from "@/sotres/dealsStore";
import { useEffect, useState } from "react";

export default function TableHead() {
    const [isAllSelected, setIsAllSelected] = useState(false);
    const selectAllItems = useDealsStore((state) => state.selectAllItems);
    const unSelectAllItems = useDealsStore((state) => state.unSelectAllItems);

    useEffect(() => {
        isAllSelected ? selectAllItems() : unSelectAllItems();
    }, [isAllSelected]);

    const toggleIsAllChecked = () => {
        setIsAllSelected(!isAllSelected);
    };

    return (
        <thead className="bg-white rounded-lg h-[70px]  ">
            <tr className="rounded-full   text-[18px]">
                <th className="  text-center font-medium w-[20px]">
                    <Input
                        onChange={toggleIsAllChecked}
                        checked={isAllSelected}
                        className=" ml-[20px] w-[20px] accent-[#1D1DCE]"
                        type="checkbox"
                    />
                </th>
                <th className="text-center font-medium relative">
                    Name
                    <Sort className="absolute right-[10%] top-1/2 -translate-y-1/2" />
                </th>
                <th className="text-center font-medium relative">
                    Owner{" "}
                    <Sort className="absolute right-[10%] top-1/2 -translate-y-1/2" />
                </th>
                <th className="text-center font-medium relative">
                    Last contact{" "}
                    <Sort className="absolute right-[10%] top-1/2 -translate-y-1/2" />
                </th>
                <th className="text-center font-medium relative">
                    Company name{" "}
                    <Sort className="absolute right-[10%] top-1/2 -translate-y-1/2" />
                </th>
                <th className="text-center font-medium relative">
                    Work{" "}
                    <Sort className="absolute right-[10%] top-1/2 -translate-y-1/2" />
                </th>
                <th className="text-center font-medium relative">
                    Last stage{" "}
                    <Sort className="absolute right-[10%] top-1/2 -translate-y-1/2" />
                </th>
                <th className="text-center font-medium "></th>
            </tr>
        </thead>
    );
}
