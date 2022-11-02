import create from "zustand";

const traceRouteDialogStore = create((set, get) => ({
  isOpen: false,
  setIsOpen: (state = false) => {
    set({ isOpen: state });
  }
}));

export default traceRouteDialogStore;