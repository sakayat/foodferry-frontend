import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import SignInPage from "./pages/SignInPage";
import FoodDetailsPage from "./pages/FoodDetailsPage";
import ViewCartPage from "./pages/ViewCartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import ProfilePage from "./pages/ProfilePage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import SignUpPage from "./pages/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AddFoodItemPage from "./pages/AddFoodItemPage";
import RestaurantDashboardLayout from "./components/RestaurantDashboardLayout";
import RestaurantDashboardHome from "./pages/RestaurantDashboardHome";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import FoodItemsPage from "./pages/FoodItemsPage";
import UpdateRestaurantFood from "./pages/UpdateRestaurantFood";
import UpdateRestaurantInfo from "./pages/UpdateRestaurantInfo";
import AdminDashboardLayout from "./components/AdminDashboardLayout";
import AdminDashboardHome from "./pages/AdminDashboardHome";
import UsersPage from "./pages/UsersPage";
import UpdateUserRolePage from "./pages/UpdateUserRolePage";
import CreateRestaurantPage from "./pages/CreateRestaurantPage";
import RestaurantListPage from "./pages/RestaurantListPage";
import AddCategoryPage from "./pages/AddCategoryPage";
import CategoryListPage from "./pages/CategoryListPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="food/:slug/" element={<FoodDetailsPage />} />
        <Route path="sign-up/" element={<SignUpPage />} />
        <Route path="sign-in/" element={<SignInPage />} />
        <Route path="unauthorized/" element={<UnauthorizedPage />} />
        <Route
          path="profile/"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="update-profile/"
          element={
            <ProtectedRoute>
              <UpdateProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="view-cart/"
          element={
            <ProtectedRoute>
              <ViewCartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="checkout/"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="order-history/"
          element={
            <ProtectedRoute>
              <OrderHistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="restaurant/dashboard/"
          element={
            <ProtectedRoute requiredRole={"restaurant_owner"}>
              <RestaurantDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<RestaurantDashboardHome />} />
          <Route path="add-food-item/" element={<AddFoodItemPage />} />
          <Route
            path="update-food-item/:id/"
            element={<UpdateRestaurantFood />}
          />
          <Route
            path="update-restaurant-info/"
            element={<UpdateRestaurantInfo />}
          />
          <Route path="food-items/" element={<FoodItemsPage />} />
        </Route>

        <Route
          path="admin/dashboard/"
          element={
            <ProtectedRoute>
              <AdminDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<AdminDashboardHome />} />
          <Route path="users/" element={<UsersPage />} />
          <Route
            path="users/update-role/:id/"
            element={<UpdateUserRolePage />}
          />
          <Route path="create-restaurant/" element={<CreateRestaurantPage />} />
          <Route path="restaurant-list/" element={<RestaurantListPage />} />
          <Route path="food-category/" element={<AddCategoryPage />} />
          <Route path="category-list/" element={<CategoryListPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
