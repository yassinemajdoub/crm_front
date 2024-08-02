// "use client";
// import TrashListView from "@/components/svg/TrashListView";
// import { Input } from "@/components/ui/input";
// import { useLeadsStore } from "@/stores/leadsStore";
// import { useEffect, useState } from "react";

// export default function TableHead() {
//     const [isAllSelected, setIsAllSelected] = useState(false);
//     const selectAllItems = useLeadsStore((state) => state.selectAllItems);
//     const unSelectAllItems = useLeadsStore((state) => state.unSelectAllItems);
//     const selectedItemCount = useLeadsStore((state) =>
//         state.getSelectedItemsCount()
//     );
//     const tableColumns = useLeadsStore((state) => state.tableColumns);

//     useEffect(() => {
//         isAllSelected ? selectAllItems() : unSelectAllItems();
//     }, [isAllSelected, selectAllItems, unSelectAllItems]);

//     const toggleIsAllChecked = () => {
//         setIsAllSelected(!isAllSelected);
//     };

//     const handleTrashClicks = () => {
//         console.log(`${selectedItemCount} deleted`);
//     };

//     if (selectedItemCount) {
//         return (
//             <thead className="bg-white rounded-lg h-[70px]">
//                 <tr className="rounded-full text-[15px] bg-indigo-50 relative">
//                     <th className="text-center text-base font-semibold leading-normal w-[140px] pl-2">
//                         <div className="flex items-center gap-2">
//                             <Input
//                                 type="checkbox"
//                                 onChange={toggleIsAllChecked}
//                                 checked={isAllSelected}
//                                 className=" ml-[10px] z-50 w-[20px] accent-[#1D1DCE]"
//                             />
//                             <div className="flex items-center">
//                                 {selectedItemCount} Selected
//                             </div>
//                         </div>
//                     </th>

//                     {tableColumns
//                         .filter((col) => col.isSelected)
//                         .map((col, index) => (
//                             <th key={col.name || index} className="text-center text-base font-semibold leading-normal w-[200px] opacity-0">
//                                 {col.name}
//                             </th>
//                         ))}

//                     <th className="text-center font-medium w-[50px]">
//                         <div className="flex flex-row justify-between items-center absolute left-0 top-1/2 right-3 -translate-y-1/2">
//                             <div className="flex flex-row items-center"></div>
//                             <div className="flex flex-row z-50 hover:scale-110 transition-transform hover:cursor-pointer active:scale-100 items-center px-6">
//                                 <TrashListView
//                                     className=""
//                                     onClick={handleTrashClicks}
//                                 />
//                             </div>
//                         </div>
//                     </th>
//                 </tr>
//             </thead>
//         );
//     }
//     return (
//         <thead className="bg-white rounded-lg h-[70px]">
//             <tr className="rounded-full text-[18px] bg-indigo-50">
//                 <th className="text-center font-medium w-[50px] pl-2">
//                     <Input
//                         onChange={toggleIsAllChecked}
//                         checked={isAllSelected}
//                         className=" ml-[12px] w-[20px] accent-[#1D1DCE"
//                         type="checkbox"
//                     />
//                 </th>

//                 {tableColumns
//                         .filter((col) => col.isSelected)
//                         .map((col, index) => (
//                             <th key={col.name || index} className="text-center  text-base font-semibold leading-normal w-[200px]">
//                                 {col.name}
//                             </th>
//                         ))}

//                 <th className="text-center font-medium w-[50px]"></th>
//             </tr>
//         </thead>
//     );
// }
