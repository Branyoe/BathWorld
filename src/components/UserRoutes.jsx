import { Outlet} from "react-router-dom";
import { useAuth } from "../context/authContext";

const UserRoutes = () => {
  const { user } = useAuth();

  if (user.roleCode === 1 || !user.roleCode) return <Outlet />;
  
  return <h1>Acceso denegado</h1>;
}

export default UserRoutes;