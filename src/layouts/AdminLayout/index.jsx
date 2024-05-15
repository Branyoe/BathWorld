import { Outlet } from "react-router-dom";
import appNavBarStore from "../../stores/appNavBarStore";
import { useEffect } from "react";
import AdminAppBar from "./components/AdminAppBar";

const AdminLayout = ({ children }) => {

  const { setShow } = appNavBarStore(state => ({
    setShow: state.setShow,
  }));

  useEffect(() => {
    setShow(false);
  }, [setShow])

  return (
    <AdminAppBar>
      <Outlet />
    </AdminAppBar>

  );
}

export default AdminLayout;