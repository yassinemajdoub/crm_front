import { create } from 'zustand'


export type DashboardItem = {
    id: string;
    name: string;
    owner: string;
    lastContact: string;
    companyName: string;
    work: string;
    lastStage: number;
    isSelected?: boolean
}


type DashboardDataType = {
    items: DashboardItem[]
    visibleItems: DashboardItem[],
    selectItem: (id: string) => void
    unSelectItem: (id: string) => void
    selectAllItems: () => void
    unSelectAllItems: () => void
    searchByName: (searchText: string) => void
}



const fakeItems = [
    { id: "1", isSelected: false, name: "Web Form", owner: "Kathryn Murphy", lastContact: "Mar 02, 2019", companyName: "Blue Hawk", work: "Confined Space", lastStage: 100 },
    { id: "2", isSelected: false, name: "Twitter Ads", owner: "Devon Lane", lastContact: "Mar 22, 2013", companyName: "Samsung", work: "Blasting", lastStage: 156 },
    { id: "3", isSelected: false, name: "Online", owner: "Jane Cooper", lastContact: "Mar 02, 2019", companyName: "Amanda", work: "Excavation Works", lastStage: 100 },
    { id: "4", isSelected: false, name: "Online Meeting", owner: "Kathryn Murphy", lastContact: "Mar 02, 2019", companyName: "Blue Hawk", work: "Confined Space", lastStage: 100 },
    { id: "5", isSelected: false, name: "Web Form", owner: "Kathryn Murphy", lastContact: "Mar 02, 2019", companyName: "Blue Hawk", work: "Confined Space", lastStage: 100 },
    { id: "6", isSelected: false, name: "Web Form", owner: "Kathryn Murphy", lastContact: "Mar 02, 2019", companyName: "Blue Hawk", work: "Confined Space", lastStage: 100 },
    { id: "7", isSelected: false, name: "Web Form", owner: "Kathryn Murphy", lastContact: "Mar 02, 2019", companyName: "Blue Hawk", work: "Confined Space", lastStage: 100 }
]



export const useDashboardStore = create<DashboardDataType>((set) => (
    {
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
            console.log(searchText)
            if (searchText) {
                set(state => ({
                    visibleItems: state.items.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
                }))
            } else {
                set(state => ({
                    visibleItems: state.items
                }))
            }

        }
    }
))