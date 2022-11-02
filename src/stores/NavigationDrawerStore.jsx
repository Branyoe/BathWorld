import create from "zustand";

const navigationDrawerStore = create((set, get) => ({
  isOpen: false,
  setIsOpen: (state = false) => {
    set({ isOpen: state });
  }
}));

export default navigationDrawerStore;