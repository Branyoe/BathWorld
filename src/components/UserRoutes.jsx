import { Outlet} from "react-router-dom";
import { useAuth } from "../context/authContext";
import StatusMsg from "../views/StatusMsg";

const UserRoutes = () => {
  const { user } = useAuth();

  if (user.roleCode === 1 || !user.roleCode) return <Outlet />;
  
  return <StatusMsg status={401} title="No Autorizado" msg="No deberías estar aquí"/>;
}

export default UserRoutes;