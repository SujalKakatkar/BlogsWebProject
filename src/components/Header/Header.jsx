/** @format */

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Logo, LogoutBtn } from "../index";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen]=useState(false)
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const navItems = [
    
    {
      name: "Home",
      slug: "/home",
      active: authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "My Posts",
      slug: "/my-post",
      active:authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "Profile",
      slug: "/profile",
      active:authStatus
    }
    
  ];
  return (
    <header className="py-3 shadow bg-gray-900 w-full">
      <Container>
        <nav className="flex justify-between relative">
          <div className="mr-4 block">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          {/* for desktop */}
          <ul className="sm:flex hidden sm:items-center sm:justify-end w-full ml-auto flex-col sm:flex-row  ">
            {navItems.map((item) => (
              item.active ? (
                <li key={item.name}>
                  <button onClick={()=>navigate(item.slug)}
                    className="inline-block px-6 py-2 duration-200 text-white  hover:bg-blue-100 hover:text-gray-900 rounded-full"
                  >{item.name}</button>
              </li>
              ): null
            ))}
            {authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )}
          </ul>
          {/* for mobile */}
          {isOpen && (<ul className="mt-5 bg-gray-900 flex sm:hidden items-center justify-end w-full ml-auto flex-col  ">
            {navItems.map((item) => (
              item.active ? (
                <li key={item.name}>
                  <button onClick={()=>navigate(item.slug)}
                    className="inline-block px-6 py-2 duration-200 text-white  hover:bg-blue-100 hover:text-gray-900 rounded-full"
                  >{item.name}</button>
              </li>
              ): null
            ))}
            {authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )}
          </ul>)}
          <div onClick={toggleMenu} className="sm:hidden flex justify-center items-center absolute right-3 top-3">
          <img src="/public/icons/menu_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="" />
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
