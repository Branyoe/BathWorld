import adminAppBarStore from "../stores/adminAppBarStore";

const useAdmAppBarTitle = () => {
  const setTitle = adminAppBarStore(state => state.setTitle);
  const title = adminAppBarStore(state => state.title);

  return [setTitle, title];
};

export default useAdmAppBarTitle;