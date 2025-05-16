/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { Container, Logo, LogoutBtn } from "../index";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

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
        <nav className="flex">
          <div className="mr-4 hidden sm:block">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex justify-center items-center sm:justify-end w-full ml-auto flex-col sm:flex-row  ">
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
        </nav>
      </Container>
    </header>
  );
}

export default Header;
