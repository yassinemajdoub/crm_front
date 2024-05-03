"use client";
import { XCircleIcon } from "lucide-react";
import Trash from "@/components/svg/Trash";
import { useEffect, useState, ChangeEvent } from "react";
// import { AllCategoriesType } from "../actions";
import { toast } from "sonner";
import { executeGqlRequest } from "../actions";
import { Input } from "@/components/ui/input";
import { createPortal } from "react-dom";
import { create } from 'zustand';

export interface Category {
    id: number;
    name: string;
  }
  
  export const CATEGORIES: Category[] = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Books' },
    { id: 3, name: 'Furniture' },
    { id: 4, name: 'Clothing' },
    { id: 5, name: 'Sports' },
  ];
  interface SubCategory {
    id: number;
    name: string;
  }
  interface CategoryStore {
    selectedSubCategories: SubCategory[];
    setSelectedSubCategories: (subCategories: SubCategory[]) => void;
    addSubCategory: (subCategory: SubCategory) => void;
    removeSubCategory: (id: number) => void;
    clearSubCategories: () => void;
  }
  
  export const useCategoryStore = create<CategoryStore>((set, get) => ({
    selectedSubCategories: [],
    setSelectedSubCategories: (subCategories) => set({ selectedSubCategories: subCategories }),
    addSubCategory: (subCategory) => {
      const current = get().selectedSubCategories;
      if (!current.find((sc) => sc.id === subCategory.id)) {
        set({ selectedSubCategories: [...current, subCategory] });
      }
    },
    removeSubCategory: (id) => {
      set({ selectedSubCategories: get().selectedSubCategories.filter((sc) => sc.id !== id) });
    },
    clearSubCategories: () => {
      set({ selectedSubCategories: [] });
    },
  }));
  

export default function CategoriesSelect({ className }: { className: string }) {
    const { selectedSubCategories, addSubCategory, removeSubCategory, clearSubCategories } = useCategoryStore();
    const [visibleCategories, setVisibleCategories] = useState<Category[]>(CATEGORIES); // Initialize with all categories
    const [searchValue, setSearchValue] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    // const { selectedSubCategories, setSelectedSubCategories } = useNewProduct(
    //     (state) => ({
    //         selectedSubCategories: state.selectedSubCategories,
    //         setSelectedSubCategories: state.setSelectedSubCategories,
    //     })
    // );
    //add the category id to the selectedSubCategories
    // const addSubCategory = (id: string) => {
    //     if (!selectedSubCategories.find((subCat) => subCat.id === id)) {
    //         const newSub = allCategories?.find((c) => c.id.toString() === id);

    //         newSub &&
    //             setSelectedSubCategories([...selectedSubCategories, newSub]);
    //     }
    // };

    // const removeOne = (id: string) => {
    //     setSelectedSubCategories(
    //         selectedSubCategories.filter((c) => c.id !== id)
    //     );
    // };
    // const removeAll = () => {
    //     setSelectedSubCategories([]);
    // };


    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        if (!value) {
            setVisibleCategories(CATEGORIES);
            return;
        }
        setVisibleCategories(
            CATEGORIES.filter((category) => category.name.toLowerCase().includes(value.toLowerCase()))
        );
    };

    const stopSearching = () => {
        setIsSearching(false);
        setSearchValue("");
        setVisibleCategories(CATEGORIES);
    };



    return (
        <div className="relative">
            <Input
                placeholder="Catégorie"
                onChange={handleSearch}
                onFocus={() => setIsSearching(true)}
                type="text"
                className={className}
                value={searchValue}
            />

            {/* search results  */}
            {isSearching && (
                <div className="max-w-full absolute z-50 bg-white top-[50px] shadow-lg rounded-md max-h-[200px] overflow-scroll w-full  p-0 min-w-[700px]  ">
                    {visibleCategories?.map((category) => (
                        <div
                            tabIndex={0}
                            role="button"
                            key={category.id}
                            onClick={() => {
                                addSubCategory(category);
                                stopSearching();
                            }}
                            className="w-full  p-[8px] hover:bg-black/5 hover:cursor-pointer">
                            {category.name}
                        </div>
                    ))}
                </div>
            )}
            <div className="mt-[20px] flex items-center gap-[8px]">
                {selectedSubCategories.map((subCategory) => (
                    <div
                        key={subCategory.id}
                        className=" flex items-center bg-black w-fit rounded-[4px] text-[16px] font-medium py-[2px] pr-[4px] pl-[8px] text-white ">
                        {subCategory.name}
                        <XCircleIcon
                            onClick={() => removeSubCategory(subCategory.id)}
                            className="fill-white/60 ml-[2px] stroke-black "
                        />
                    </div>
                ))}
                {selectedSubCategories.length > 0 && (
                    <Trash
                        onClick={clearSubCategories}
                        className="stroke-white stroke-[2] bg-red-500 scale-110 rounded-[4px]  p-[2px]"
                    />
                )}
            </div>
            {/** hidden overlay */}
            {isSearching &&
                createPortal(
                    <div
                        className="absolute h-full z-40 opacity-0 bg-black w-full"
                        onClick={() => {
                            stopSearching();
                        }}></div>,
                    document?.body
                )}
        </div>
    );
}


    // useEffect(() => {
    //     executeGqlRequest(`
    //     query {
    //         allCategories
    //         {
    //           id
    //           slug
    //           name
    //         }
    //       }
    //     `).then((res) => {
    //         if ("allCategories" in res.data) {
    //             setAllCategories(res.data.allCategories);
    //             setVisibleCategories(res.data?.allCategories);
    //         } else {
    //             toast.error("error fetching categories");
    //             console.log(res.error);
    //         }
    //     });
    // }, []);