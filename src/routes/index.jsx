import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import { AppNavBar } from "../layouts/AppNavBar";
import BathroomView from "../views/BathroomView";
import CatalogView from "../views/Catalog";
import { ContactView } from "../views/Contact";
import { HomeView } from "../views/Home";
import { RouteView } from "../views/RouteView";
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";
import { UserView } from "../views/User";

const RoutesComponent = () => (
  <>
    <BrowserRouter>
      <AppNavBar>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <HomeView />
            </ProtectedRoute>
          } />
          <Route path="/user" element={
            <ProtectedRoute>
              <UserView />
            </ProtectedRoute>
          } />
          <Route path="/contact" element={<ContactView/>}/>
          <Route path="/catalog" element={<CatalogView/>}/>
          <Route path="/bathroom/:id" element={<BathroomView />} />
          <Route path="/route/:id" element={<RouteView />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </AppNavBar>
    </BrowserRouter>
  </>
);

export default RoutesComponent;
