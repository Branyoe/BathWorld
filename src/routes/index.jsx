import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import { AppNavBar } from "../layouts/AppNavBar";
import BathroomView from "../views/BathroomView";
import CatalogView from "../views/Catalog";
import BathCategory from "../views/Catalog/components/BathCategory";
import { ContactView } from "../views/Contact";
import { HomeView } from "../views/Home";
import { RouteView } from "../views/RouteView";
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";
import { UserView } from "../views/User";
//admin views
import AdminHome from "../views/admin/AdminHome";
import AdminLayout from "../layouts/AdminLayout";
import AddBathView from "../views/admin/AddBathView";
import BathListView from "../views/admin/BathListView";
import EditBathView from "../views/admin/EditBathView";

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
          <Route path="/contact" element={<ContactView />} />
          <Route path="/catalog" element={<CatalogView />} />
          <Route path="/catalog/:category" element={<BathCategory />} />
          <Route path="/bathroom/:id" element={<BathroomView />} />
          <Route path="/route/:id" element={<RouteView />} />
          <Route path="/admin" element={<AdminLayout/>}>
              <Route path="/admin/" element={<AdminHome />} />
              <Route path="/admin/add-bath" element={<AddBathView />} />
              <Route path="/admin/bath-list" element={<BathListView />} />
              <Route path="/admin/edit-bath" element={<EditBathView />} />
          </Route>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </AppNavBar>
    </BrowserRouter>
  </>
);

export default RoutesComponent;
