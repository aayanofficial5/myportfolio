import React, { useEffect, useRef, useState } from "react";
import { navLinks } from "../data";
import ThemeToggle from "./ThemeToggle";
import { ImCross } from "react-icons/im";

const SideBar = ({ showSideBar, setShowSideBar }) => {
  const [pathName, setPathName] = useState("home");

  const closeRef = useRef();

  // useEffect(() => {
  //   const handleHashChange = () => {
  //     setPathName(window.location.hash.slice(1));
  //   };

  //   window.addEventListener("hashchange", handleHashChange);
  //   return () => {
  //     window.removeEventListener("hashchange", handleHashChange);
  //   };
  // }, []);

  const scrollToSection = (name) => {
    const section = document.getElementById(name);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 md:left-0 bg-blue-950 text-center py-4 h-[100vh] w-[160px] md:w-[110px] flex flex-col items-center text-white font-medium z-999 transition-transform duration-300 ease-in-out ${
        showSideBar ? "translate-x-0" : "translate-x-full md:translate-x-0"
      }`}
      ref={closeRef}
    >
      {/* Close Button */}
      <button
        className="flex justify-end w-full h-[29px] px-4 pb-1 visible md:hidden"
        onClick={() => setShowSideBar(false)}
      >
        <ImCross />
      </button>

      {/* Nav Links */}
      {navLinks.map(({ name, url, icon }) => (
        <a
          key={name}
          href={url}
          aria-label={name}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(name);
            window.history.pushState(null, null, `#${name}`); // Update URL hash manually
            setPathName(name); // Update your state manually as well
          }}
          className={`text-sm px-4 py-4 flex flex-col items-center justify-center opacity-80 hover:opacity-100 w-full transition-all ${
            pathName === url.slice(1)
              ? "bg-gray-700/50 border-r-3 md:border-r-0 md:border-l-3 border-blue-400 opacity-100 text-blue-400"
              : ""
          }`}
        >
          <div className="text-[26px] mb-1">{icon}</div>
          {name.split("")[0].toUpperCase() + name.slice(1)}
        </a>
      ))}
      <ThemeToggle />
    </div>
  );
};

export default SideBar;
