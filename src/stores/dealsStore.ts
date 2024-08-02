import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


export type DealStatus = "leadDiscovered" | "contactInitiated" | "meetingArranged" | "offerAccepted"


export type Deal = {
    id: string;
    name: string;
    owner: string;
    lastContact: string;
    companyName: string; ///too remove
    work: string; // Business sector
    lastStage: number; //options and should be string
    isSelected?: boolean
    date: Date
    price: string
    stage:string;
    companyDescription: string
    meetings: { name: string, date: Date }[]
    status: DealStatus
    companyField: string
    jobs: []
}


type DealStoreDataType = {
    items: Deal[]
    visibleItems: Deal[],
    selectItem: (id: string) => void
    getSelectedItemsCount: () => number;
    unSelectItem: (id: string) => void
    selectAllItems: () => void
    unSelectAllItems: () => void
    searchByName: (searchText: string) => void
    updateItemStatus: (itemId: string, newStatus: DealStatus) => void
    tableColumns: { name: string, isSelected: boolean }[]
    setTableColumns: (cols: { name: string, isSelected: boolean }[]) => void
}



const fakeItems: Deal[] = [
    { id: "1", companyField: "", jobs: [], status: "meetingArranged",stage: "Proposal", companyDescription: "", date: new Date(), price: "4k", meetings: [], isSelected: false, name: "Web Form", owner: "Kathryn Murphy", lastContact: "Mar 02, 2019", companyName: "Blue Hawk", work: "Confined Space", lastStage: 100 },
    { id: "2", companyField: "", jobs: [], status: "leadDiscovered", stage: "Prospecting",companyDescription: "", date: new Date(), price: "5k", meetings: [], isSelected: false, name: "Twitter Ads", owner: "Devon Lane", lastContact: "Mar 22, 2013", companyName: "Samsung", work: "Blasting", lastStage: 156 },
    { id: "3", companyField: "", jobs: [], status: "contactInitiated",stage: "Contacting", companyDescription: "", date: new Date(), price: "7k", meetings: [], isSelected: false, name: "Online", owner: "Jane Cooper", lastContact: "Mar 02, 2019", companyName: "Amanda", work: "Excavation Works", lastStage: 100 },
    { id: "4", companyField: "", jobs: [], status: "contactInitiated",stage: "Contacting", companyDescription: "", date: new Date(), price: "19k", meetings: [], isSelected: false, name: "Online Meeting", owner: "Kathryn Murphy", lastContact: "Mar 02, 2019", companyName: "Blue Hawk", work: "Confined Space", lastStage: 100 },
    { id: "5", companyField: "", jobs: [], status: "leadDiscovered", stage: "Prospecting",companyDescription: "", date: new Date(), price: "80k", meetings: [], isSelected: false, name: "Web Form", owner: "Kathryn Murphy", lastContact: "Mar 02, 2019", companyName: "Blue Hawk", work: "Confined Space", lastStage: 100 },
    { id: "6", companyField: "", jobs: [], status: "leadDiscovered", stage: "Prospecting",companyDescription: "", date: new Date(), price: "8k", meetings: [], isSelected: false, name: "Web Form", owner: "Kathryn Murphy", lastContact: "Mar 02, 2019", companyName: "Blue Hawk", work: "Confined Space", lastStage: 100 },
    { id: "7", companyField: "", jobs: [], status: "leadDiscovered", stage: "Prospecting",companyDescription: "", date: new Date(), price: "10k", meetings: [], isSelected: false, name: "Web Form", owner: "Kathryn Murphy", lastContact: "Mar 02, 2019", companyName: "Blue Hawk", work: "Confined Space", lastStage: 100 }
]



export const useDealsStore = create<DealStoreDataType>(

        (set, get) => ({
            tableColumns: [{ name: "Name", isSelected: true }, { name: "Owner", isSelected: true }, { name: "Last contact", isSelected: true }, { name: "Company name", isSelected: true }, { name: "work", isSelected: false }, { name: "last stage", isSelected: false },{ name: "status", isSelected: true },{ name: "stage", isSelected: true }],
            setTableColumns: (newCols) => {
                set(() => ({ tableColumns: newCols }))
            },
            items: fakeItems,
            visibleItems: fakeItems,
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
            updateItemStatus: (itemId: string, newStatus: DealStatus) => {
                set(state => {
                    const updatedItems: Deal[] = state.items.map(item => {
                        if (item.id === itemId) {
                            return { ...item, status: newStatus }
                        }
                        return item
                    })
                    return { items: updatedItems, visibleItems: updatedItems }
                })
            },
            getSelectedItemsCount: () => {
                const state = get();
                return state.items.filter(item => item.isSelected).length;
            },
        })
    )

        // {
        //     name: 'deals-storage',
        //     storage: createJSONStorage(() => localStorage), // Can be switched to localStorage if needed
        // }