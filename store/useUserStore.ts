import { User } from "@/types";
import { create } from "zustand";

interface UserStore {
  user: User | null;
  getUser: () => void;
  setUserState: (user: User | null) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  getUser: async () => {
    try {
      const res = await fetch("/api/user/me");
      if(res.status !== 200) return
      const data = await res.json();
      set({ user: data });
    } catch (error) {
      console.log("Failed to get the user.", error);
    }
  },
  setUserState: (user) => {
    set({ user });
  },
}));

export default useUserStore;
