import create from "zustand";

const appNavBarStore = create((set, get) => ({
  show: false,
  setShow: (state) => {
    set({ show: state });
  },
  current: "home",
  setCurrent: state => {
    set({ current: state });
  }
}));

export default appNavBarStore;