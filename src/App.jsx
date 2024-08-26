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

function App() {
  const token = localStorage.getItem("authToken");
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="food/:slug/" element={<FoodDetailsPage />} />
        <Route path="sign-up/" element={<SignUpPage />} />
        <Route path="sign-in/" element={<SignInPage />} />
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
      </Routes>
    </>
  );
}

export default App;
