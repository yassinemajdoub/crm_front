import { create } from 'zustand';

const useTableStore = create((set) => ({
    state: {},
    initialize: (initialState) => set((state) => ({
      state: {
        ...initialState,
        rowSelection: { 0: true, 1: true, 2: true, 3: true, 4: true },
        pagination: {
          pageIndex: 0,
          pageSize: 15,
        },
      },
    })),
    setState: (newState) => set((state) => ({ state: { ...state.state, ...newState } })),
  }));


export default useDataTableStore;
