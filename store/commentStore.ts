import create from "zustand";
import { persist } from "zustand/middleware";

const commentStore = (set: any) => ({
  name: "",
  email: "",
  addName: (name: string) => set({ name: name }),
  addEmail: (email: string) => set({ email: email }),

  removeName: () => set({ name: "" }),
  removeEmail: () => set({ email: "" }),
});

const useCommentStore = create(
  persist(commentStore, {
    name: "comment",
  })
);

export default useCommentStore;
