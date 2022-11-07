import create from "zustand";

const chatraStore = create((set, get) => ({
  chat: null,
  setChat: (state) => {
    set({ chat: state });
  }
}));

export default chatraStore;