/** @format */

import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
    return (
        <button className="inline-block px-6 py-2 duration-200 text-white hover:bg-blue-100 hover:text-[#141B41] rounded-full" onClick={logoutHandler}>LogOut</button>
    
    )
}

export default LogoutBtn;
