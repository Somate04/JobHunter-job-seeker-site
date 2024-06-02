import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Home/Home";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import Profile from "./Profile/Profile";
import NewAd from "./NewAd/NewAd";
import Logout from "./Logout/Logout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new" element={<NewAd />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
