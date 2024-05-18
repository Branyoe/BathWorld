import create from "zustand";

const adminAppBarStore = create((set, get) => ({
  title: "BathWorld",
  setTitle: state => {
    set({ title: state });
  }
}));

export default adminAppBarStore;