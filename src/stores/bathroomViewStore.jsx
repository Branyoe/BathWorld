import create from "zustand";

const bathroomViewStore = create((set, get) => ({
  route: "/",
  setRoute: (state) => {
    set({ route: state });
  }
}));

export default bathroomViewStore;