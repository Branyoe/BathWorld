import { Outlet } from "react-router-dom";
import appNavBarStore from "../../stores/appNavBarStore";
import { useEffect } from "react";
import AdminAppBar from "./components/AdminAppBar";
import { useAuth } from "../../context/authContext";

const AdminLayout = ({ children }) => {
  const {user} = useAuth();

  const { setShow } = appNavBarStore(state => ({
    setShow: state.setShow,
  }));

  useEffect(() => {
    setShow(false);
  }, [setShow])

  if (user.roleCode !== 2 ) return <h1>Acceso denegado</h1>;

  return (
    <AdminAppBar>
      <Outlet />
    </AdminAppBar>

  );
}

export default AdminLayout;