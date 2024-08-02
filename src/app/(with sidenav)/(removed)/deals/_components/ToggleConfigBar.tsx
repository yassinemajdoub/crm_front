"use client";
import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import SettingsSideBar from "@/components/svg/SettingsSideBar";
import { useDealsStore } from "@/stores/dealsStore";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const ToggleConfigBar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const columns = useDealsStore((state) => state.tableColumns);
    const setColumns = useDealsStore((state) => state.setTableColumns);

    // Function to toggle the sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
        console.log(columns)
    };

    const selectItem = (name: string) => {
        setColumns(
            columns.map((c) => {
                if (c.name === name) {
                    return { ...c, isSelected: !c.isSelected };
                }
                return c;
            })
        );
    };

    return (
        <div>
            <div
                className="w-[26px] h-6 bg-blue-900 rounded-tl rounded-bl absolute flex items-center justify-center"
                style={{ top: "210px", right: 0 }}
                onClick={toggleSidebar}>
                {/* <VscSettings color="white" className="m-auto" /> */}
                <SettingsSideBar className="" />
            </div>
            {isSidebarOpen && (
                <div
                    className="absolute top-0 right-0 w-[350px] h-full bg-white shadow-lg p-6"
                    style={{
                        zIndex: 15,
                        transition: "transform 0.3s",
                        transform: isSidebarOpen
                            ? "translateX(0)"
                            : "translateX(100%)",
                    }} // Slide-in animation
                >
                    {/* Sidebar content */}
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-xl font-semibold ">Manage Content</h2>
                        <button
                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-200"
                            onClick={toggleSidebar}>
                            <FiX size={18} />
                        </button>
                    </div>
                    <ul >
                        {/* Loop through a list of items with checkboxes */}
                        {columns.map((item, index) => (
                            <div
                                className="flex items-center py-2 hover:bg-blue-200"
                                key={index}
                                onClick={() => selectItem(item.name)}>
                                <Checkbox
                                className="mr-2"
                                checked={item.isSelected}
                                />
                                <li className="font-meduim" >{item.name}</li>
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ToggleConfigBar;
