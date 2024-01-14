import "./App.css";
import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Navbar from "./component/Navbar";
import Homescreen from "./screens/Homescreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cartscreen from "./screens/Cartscreen";
import Loginscreen from "./screens/Loginscreen";
import Registerscreen from "./screens/Registerscreen";
import Ordersscreen from "./screens/Ordersscreen";
import Adminscreen from "./screens/Adminscreen";
import Userslist from "./component/Userslist";
import Pizzaslist from "./component/Pizzaslist";
import Addpizza from "./component/Addpizza";
import Orderslist from "./component/Orderslist";
import Editpizza from "./component/Editpizza";
import Payment from "./component/Payment";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Homescreen />} />
          <Route path="/cart/*" element={<Cartscreen />} />
          <Route path="/login" element={<Loginscreen />} />
          <Route path="/register" element={<Registerscreen />} />
          <Route path="/orders" element={<Ordersscreen />} />
          <Route path="/admin/*" element={<Adminscreen />} />

          <Route path="/admin" element={<Userslist />} />
          <Route path="/admin/userslist" element={<Userslist />} />
          <Route path="/admin/pizzaslist" element={<Pizzaslist />} />
          <Route path="/admin/addpizza" element={<Addpizza />} />
          <Route path="/admin/orderslist" element={<Orderslist />} />
          <Route path="/admin/editpizza/:pizzaid" element={<Editpizza />} />

          <Route path="/cart/checkout" element={<Payment />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
