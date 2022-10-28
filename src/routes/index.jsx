import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import BathroomView from "../views/BathroomView";
import { HomeView } from "../views/Home";
import { RouteView } from "../views/RouteView";
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";

const RoutesComponent = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <HomeView />
        </ProtectedRoute>
      } />
      <Route path="/bathroom/:id" element={<BathroomView/>}/>
      <Route path="/route/:id" element={<RouteView/>}/>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  </BrowserRouter>
);

export default RoutesComponent;
