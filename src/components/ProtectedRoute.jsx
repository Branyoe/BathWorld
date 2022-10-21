import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Loading } from "./Loading";

export default function ProtectedRoute({ children }) {
  const {user, loading} = useAuth();
  if (loading) return <Loading />
  if (!user) return <Navigate to="/sign-up" />
  return <>{children}</>
}