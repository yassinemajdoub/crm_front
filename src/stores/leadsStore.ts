import { Combobox } from '@/app/(with sidenav)/(removed)/leads/_components/ComboBox';
import { create } from 'zustand'

  const updatedTableColumns = [
    { name: "name", isSelected: true },
    { name: "owner", isSelected: true },
    { name: "phone", isSelected: false }, // Default not selected
    { name: "TINumber", isSelected: false }, // Default not selected
    { name: "source", isSelected: true },
    { name: "email", isSelected: true },
    { name: "description", isSelected: false },
    { name: "business_sector", isSelected: false },
    { name: "rating", isSelected: false },
    { name: "has_website", isSelected: false },
    { name: "spending_on_ads", isSelected: false },
    { name: "number_of_employes", isSelected: false },
    { name: "annual_revenue", isSelected: false },
    { name: "stage", isSelected: true },
    { name: "status", isSelected: true },
  ];
  
  const stringAndBooleanCols = [
    "id",
    "name",
    "owner",
    "phone",
    "TINumber",
    "source",
    "email",
    "description",
    "business_sector",
    "rating",
    "has_website",
    "spending_on_ads",
    "number_of_employes",
    "annual_revenue",
  ];


export type leadStatus = "leadDiscovered" | "contactInitiated" | "meetingArranged" | "offerAccepted"

type Status={
    id:string,
    name:string,
    color: string; 
    textColor: string; 
}
export type Contact = {
    id:number,
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    phone: string;
    role: string;
};

export type Lead = {
    id: number;
    name: string;
    owner: string;
    phone?: string; 
    source?: string; 
    TINumber?: string; 
    email?: string;
    tags: string[];
    photo:string;
    stage?: Status; 
    status?: Status; 
    description?: string; 
    business_sector?: string; 
    rating?: number; 
    facebook?: string;
    instagram?: string;
    Linkden: string;
    tiktok?: string
    email2?: string;
    isSelected?: boolean; 
    has_website?: boolean; 
    website: string;
    spending_on_ads?: boolean; 
    number_of_employes?: number;
    annual_revenue?: string;
    contacts?: Contact[];
    // options:{
    //     value: number,
    //     label: string,
    //   },
    niches?: string[]; 
    notes?: [{
        id: number;
        title: string;
        content: string;
        createdBy: {
            id: number;
            email:string;
        };
        createdAt: string; 
        updatedAt: string; 
    }]
  };



type leadStoreDataType = {
    items: Lead[]
    visibleItems: Lead[],
    ///
    statuses:Combobox[],
    stages:Combobox[],
    setStatuses:(statuses:Combobox[])=> void;
    setStages:(Stages:Combobox[])=> void;
    ///selectItems
    // selectItem: (id: string) => void
    getSelectedItemsCount: () => number;
    // unSelectItem: (id: string) => void
    // selectAllItems: () => void
    // unSelectAllItems: () => void
     ///selectItems

    searchByName: (searchText: string) => void
    // updateItemStatus: (itemId: string, newStatus: Status) => void

    ///for choosing what the table shows
    tableColumns: { name: string, isSelected: boolean }[]
    setTableColumns: (cols: { name: string, isSelected: boolean }[]) => void
    stringAndBooleanCols: string[]; // List of `string`/`boolean` fields
    setLeads: (leads: Lead[]) => void;

}

export const useLeadsStore = create<leadStoreDataType>(

        (set, get) => ({
            tableColumns: updatedTableColumns,
            setTableColumns: (newCols) => {
                set(() => ({ tableColumns: newCols }))
            },
            statuses: [],
            stages: [],
            items: null,
            visibleItems: null,
            setLeads: (leads: Lead[]) => {
                set({
                  items: leads, 
                  visibleItems: leads, 
                });
              },
              setStatuses: (statuses: Combobox[]) => {
                set({ statuses });
              },
              setStages: (stages: Combobox[]) => {
                set({ stages });
              },
            selectItem: (id) => {
                set((state) => ({
                    visibleItems: state.items.map(item => {
                        if (item.id === id) {
                            return { ...item, isSelected: true }
                        }
                        return item
                    }),
                    items: state.items.map(item => {
                        if (item.id === id) {
                            return { ...item, isSelected: true }
                        }
                        return item
                    })
                }))
            },
            unSelectItem: (id) => {
                set((state) => ({
                    visibleItems: state.items.map(item => {
                        if (item.id === id) {
                            return { ...item, isSelected: false }
                        }
                        return item
                    }),
                    items: state.items.map(item => {
                        if (item.id === id) {
                            return { ...item, isSelected: false }
                        }
                        return item
                    })
                }))
            },
            selectAllItems: () => {
                set((state) => ({
                    items: state.items.map(item => ({ ...item, isSelected: true })),
                    visibleItems: state.items.map(item => ({ ...item, isSelected: true })),
                }))
            },
            unSelectAllItems: () => {
                set((state) => ({
                    items: state.items.map(item => ({ ...item, isSelected: false })),
                    visibleItems: state.items.map(item => ({ ...item, isSelected: false })),
                }))
            }
            , searchByName: (searchText: string) => {
                if (searchText) {
                    set(state => ({
                        visibleItems: state.items.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
                    }))
                } else {
                    set(state => ({
                        visibleItems: state.items
                    }))
                }
            },
            // updateItemStatus: (itemId: string, newStatus: Status) => {
            //     set(state => {
            //         const updatedItems: Lead[] = state.items.map(item => {
            //             if (item.id === itemId) {
            //                 return { ...item, status: newStatus }
            //             }
            //             return item
            //         })
            //         return { items: updatedItems, visibleItems: updatedItems }
            //     })
            // },
            getSelectedItemsCount: () => {
                const state = get();
                return state.items.filter(item => item.isSelected).length;
            },
            stringAndBooleanCols: stringAndBooleanCols,
        })
    )

