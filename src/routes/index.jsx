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
import AddBathView from "../views/admin/AddBathView";
import AdminLayout from "../layouts/AdminLayout";
import EditBathView from "../views/admin/EditBathView";
import BathListView from "../views/admin/BathListView";
import UserRoutes from "../components/UserRoutes";

const RoutesComponent = () => (
  <>
    <BrowserRouter>
      <AppNavBar>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <UserRoutes />
            </ProtectedRoute>
          } >
            <Route index element={<HomeView />} />
            <Route path="bathroom/:id" element={<BathroomView />} />
            <Route path="catalog" element={<CatalogView />} />
            <Route path="catalog/:category" element={<BathCategory />} />
            <Route path="contact" element={<ContactView />} />
            <Route path="route/:id" element={<RouteView />} />
            <Route path="user" element={<UserView />} />
          </Route>


          {/* Admin Routes */}
          <Route path="admin" element={<ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>}>
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
