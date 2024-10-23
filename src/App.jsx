import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";

import FoodDetailsPage from "./pages/FoodDetailsPage";
import ViewCartPage from "./pages/ViewCartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import ProtectedRoute from "./components/ProtectedRoute";
import RestaurantDashboardLayout from "./pages/dashboard/restaurant/components/layout/RestaurantDashboardLayout";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import AdminDashboardHome from "./pages/dashboard/admin/AdminDashboardHomePage";
import UpdateUserRolePage from "./pages/dashboard/admin/UpdateUserRolePage";
import AddCategoryPage from "./pages/dashboard/admin/AddCategoryPage";
import AddFoodTagPage from "./pages/dashboard/admin/AddFoodTagPage";
import FoodItem from "./components/FoodItem";
import CategoryFoodPage from "./pages/CategoryFoodPage";
import AllRestaurants from "./pages/AllRestaurants";
import RestaurantFoodPage from "./pages/RestaurantFoodPage";
import Footer from "./components/Footer";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import UserOrderListPage from "./pages/dashboard/restaurant/UserOrderListPage";
import ScrollToTop from "./components/ScrollToTop";
import ForgetPasswordPage from "./pages/auth/ForgetPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import PublicRoute from "./components/PublicRoute";
import SignInPage from "./pages/auth/SignInPage";
import ProfilePage from "./pages/profile/ProfilePage";
import UpdateProfilePage from "./pages/profile/UpdateProfilePage";
import SignUpPage from "./pages/auth/SignUpPage";
import AddFoodItemPage from "./pages/dashboard/restaurant/AddFoodItemPage";
import RestaurantDashboardHomePage from "./pages/dashboard/restaurant/RestaurantDashboardHomePage";
import FoodItemsPage from "./pages/dashboard/restaurant/FoodItemsPage";
import UpdateRestaurantFoodPage from "./pages/dashboard/restaurant/UpdateRestaurantFoodPage";
import UpdateRestaurantInfoPage from "./pages/dashboard/restaurant/UpdateRestaurantInfoPage";
import AdminDashboardLayout from "./pages/dashboard/admin/layout/AdminDashboardLayout";
import UsersPage from "./pages/dashboard/admin/UsersPage";
import CreateRestaurantPage from "./pages/dashboard/admin/CreateRestaurantPage";
import RestaurantListPage from "./pages/dashboard/admin/RestaurantListPage";
import CategoryListPage from "./pages/dashboard/admin/CategoryListPage";
import FoodTagListPage from "./pages/dashboard/admin/FoodTagListPage";
import OurMenuPage from "./pages/OurMenuPage";
import TagFoodItemsPage from "./pages/TagFoodItemsPage";

function App() {
  const token = localStorage.getItem("authToken");
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="food/:slug/" element={<FoodDetailsPage />} />
          <Route
            path="sign-up/"
            element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            }
          />
          <Route
            path="sign-in/"
            element={
              <PublicRoute>
                <SignInPage />
              </PublicRoute>
            }
          />
          <Route path="unauthorized/" element={<UnauthorizedPage />} />
          <Route path="/:tag/" element={<TagFoodItemsPage />} />
          <Route path="category/:slug/" element={<CategoryFoodPage />} />
          <Route path="restaurant-list/" element={<AllRestaurants />} />
          <Route path="restaurant/:slug/" element={<RestaurantFoodPage />} />
          <Route path="about/" element={<AboutUsPage />} />
          <Route path="contact/" element={<ContactUsPage />} />
          <Route path="our-menu/" element={<OurMenuPage />} />
          <Route
            path="forget-password/"
            element={
              <PublicRoute>
                <ForgetPasswordPage />
              </PublicRoute>
            }
          />
          <Route
            path="reset-password/:uid/:token/"
            element={
              <PublicRoute>
                <ResetPasswordPage />
              </PublicRoute>
            }
          />
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
            <Route path="" element={<RestaurantDashboardHomePage />} />
            <Route path="add-food-item/" element={<AddFoodItemPage />} />
            <Route
              path="update-food-item/:id/"
              element={<UpdateRestaurantFoodPage />}
            />
            <Route
              path="update-restaurant-info/"
              element={<UpdateRestaurantInfoPage />}
            />
            <Route path="food-items/" element={<FoodItemsPage />} />
            <Route path="user-order/" element={<UserOrderListPage />} />
          </Route>

          <Route
            path="admin/dashboard/"
            element={
              <ProtectedRoute requiredRole={"admin"}>
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
            <Route
              path="create-restaurant/"
              element={<CreateRestaurantPage />}
            />
            <Route path="restaurant-list/" element={<RestaurantListPage />} />
            <Route path="food-category/" element={<AddCategoryPage />} />
            <Route path="category-list/" element={<CategoryListPage />} />
            <Route path="food-tag/" element={<AddFoodTagPage />} />
            <Route path="tag-list/" element={<FoodTagListPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
