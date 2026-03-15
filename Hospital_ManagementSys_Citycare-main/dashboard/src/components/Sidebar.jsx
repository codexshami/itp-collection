import React, { useContext, useState } from "react";
import { Context } from "../main";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor, FaReceipt } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  const goToHome = () => {
    navigateTo("/");
    setShow(!show);
  };
  const goToDoctorsPage = () => {
    navigateTo("/doctors");
    setShow(!show);
  };
  const goToMessagePage = () => {
    navigateTo("/messages");
    setShow(!show);
  };
  const goToAddNewDoctor = () => {
    navigateTo("/doctor/addnew");
    setShow(!show);
  };
  const goToPres = () => {
    navigateTo("/pres");
    setShow(!show);
  };

  const handleLogout = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/user/admin/logout`, {
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

  return (
    <>
      <nav
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="links">
          <TiHome onClick={goToHome} />
          <FaUserDoctor onClick={goToDoctorsPage} />
          <IoPersonAddSharp onClick={goToAddNewDoctor} />
          <FaReceipt onClick={goToPres} />
          <AiFillMessage onClick={goToMessagePage} />
          <RiLogoutBoxFill onClick={handleLogout} />
        </div>
      </nav>
      <div
        className="wrapper"
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;
