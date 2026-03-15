import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main.jsx";
import { toast } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar = () => {
  const [show, setShow] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateto = useNavigate();
  const handleLogout = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/user/patient/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const gotoLogin = async () => {
    navigateto("/login");
  };
  return (
    <nav className="container">
      <div className="logo">
        <b>City Care</b>
      </div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <Link to={"/"}>HOME</Link>
          <Link to={"/appointment"}>APPOINTMENT</Link>
          <Link to={"/disease"}>DISEASES</Link>
          <Link to={"/about"}>ABOUT US</Link>
        </div>
        {isAuthenticated ? (
          <button className="logoutBtn btn" onClick={handleLogout}>
            LOGOUT
          </button>
        ) : (
          <button className="loginBtn btn" onClick={gotoLogin}>
            LOGIN
          </button>
        )}
      </div>
      <div className="hamburger" onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;
