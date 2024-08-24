import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import FoodDetails from "./components/FoodDetails";

function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="food/:slug/" element={<FoodDetails />}/>
      </Routes>
    </>
  );
}

export default App;
