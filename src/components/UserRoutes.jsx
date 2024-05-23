import { Outlet} from "react-router-dom";
import { useAuth } from "../context/authContext";
import Unauthorized from "../views/Unauthorized";

const UserRoutes = () => {
  const { user } = useAuth();

  if (user.roleCode === 1 || !user.roleCode) return <Outlet />;
  
  return <Unauthorized />;
}

export default UserRoutes;