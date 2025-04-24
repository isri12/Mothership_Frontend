import { Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import DetailsPage from "./pages/DetailsPage";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import CartPage from "./pages/CartPage";
import CategoryItemsPage from "./pages/CategoryItemsPage";
function App() {

  return (
    <Routes>
      <Route exact path="/" element={<HomePage/>} />
      <Route path="/product-detail/:id" element={<DetailsPage/>} />
      <Route path="/sign-up" element={<SignUp/>} />
      <Route path="/login" element={<LogIn/>} />
      <Route path="/cart" element={<CartPage/>} />
      <Route path="/category-items/:category" element={<CategoryItemsPage/>} />
    </Routes>
  )
}

export default App
