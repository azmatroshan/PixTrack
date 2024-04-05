import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import { NavBarLinks } from "./components/data/NavBarLinks";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";
import { useSelector } from "react-redux";

export default function App() {

  const { user: currentUser } = useSelector((state: any) => state.auth);

  return (
    <div>
      <NavBar links={NavBarLinks.links} />
      <div className="container mt-3">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}
