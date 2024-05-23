import { Outlet } from "react-router-dom";
import appNavBarStore from "../../stores/appNavBarStore";
import { useEffect } from "react";
import AdminAppBar from "./components/AdminAppBar";
import { useAuth } from "../../context/authContext";
import StatusMsg from "../../views/StatusMsg";

const AdminLayout = ({ children }) => {
  const {user} = useAuth();

  const { setShow } = appNavBarStore(state => ({
    setShow: state.setShow,
  }));

  useEffect(() => {
    setShow(false);
  }, [setShow])

  if (user.roleCode !== 2 ) return <StatusMsg status={401} title="No Autorizado" msg="No deberías estar aquí"/>;

  return (
    <AdminAppBar>
      <Outlet />
    </AdminAppBar>

  );
}

export default AdminLayout;