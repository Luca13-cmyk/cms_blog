import create from "zustand";

const searchStore = (set: any) => ({
  search: "",
  searchOpen: false,

  removeSearch: () => set({ search: "" }),
  addSearch: (search: string) => set({ search }),
  toggleSearch: (open: boolean) => set({ searchOpen: open }),
});

const useSearchStore = create(searchStore);

export default useSearchStore;
