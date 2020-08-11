import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const Header = () => {
  return (
    <header className="lg:px-16 px-6 bg-white flex flex-wrap items-center lg:py-0 py-2">
      <div
        className="hidden lg:flex lg:items-center w-full justify-between"
        id="menu"
      >
        <nav>
          <ul className="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
            <li>
              <Link
                to={{
                  pathname: "https://github.com/MA-Ahmad"
                }}
                target="_blank"
                className="lg:ml-4 lg:mr-4 flex items-center justify-start lg:mb-0 mb-4 pointer-cursor"
              >
                <img
                  className="rounded-full w-10 h-10 border-2 border-transparent hover:border-indigo-400"
                  src="https://avatars2.githubusercontent.com/u/37842853?v=4"
                  alt="Muhammad Ahmad"
                />
              </Link>
            </li>
            <li>
              <NavLink
                to="/"
                exact
                activeClassName="active"
                className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blogs/new"
                activeClassName="active"
                className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
              >
                New
              </NavLink>
            </li>
          </ul>
        </nav>
        <Link
          to={{
            pathname: "https://github.com/MA-Ahmad/reactBlog"
          }}
          target="_blank"
        >
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
            <FaGithub />
            <span className="pl-2">View Source</span>
          </button>
        </Link>
      </div>

      <label htmlFor="menu-toggle" className="pointer-cursor lg:hidden block">
        <svg
          className="fill-current text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </label>
      <input className="hidden" type="checkbox" id="menu-toggle" />
    </header>
  );
};

export default Header;
