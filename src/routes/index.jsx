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
import AddBathView from "../views/admin/AddBathView";
import AdminLayout from "../layouts/AdminLayout";
import EditBathView from "../views/admin/EditBathView";
import BathListView from "../views/admin/BathListView";

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

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout/>}>
            <Route index element={<AdminHome />} />
            <Route path="baths">
              <Route index element={<BathListView />} />
              <Route path="add" element={<AddBathView />} />
              <Route path="edit/:id" element={<EditBathView />} />
            </Route>
          </Route>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </AppNavBar>
    </BrowserRouter>
  </>
);

export default RoutesComponent;
