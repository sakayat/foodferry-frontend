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

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="food/:slug/" element={<FoodDetailsPage />} />
        <Route path="sign-in/" element={<SignInPage />} />
        <Route path="profile/" element={<ProfilePage />}/>
        <Route path="update-profile/" element={<UpdateProfilePage />}/>
        <Route path="view-cart/" element={<ViewCartPage />}/>
        <Route path="checkout/" element={<CheckoutPage />}/>
        <Route path="order-history/" element={<OrderHistoryPage />}/>
      </Routes>
    </>
  );
}

export default App;
